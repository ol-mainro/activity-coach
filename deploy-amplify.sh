#!/bin/bash
# ============================================================
# Script de déploiement : app-coach → AWS Amplify
# Usage : bash deploy-amplify.sh [--profile <nom_profil>]
# ============================================================

set -e

APP_NAME="app-coach-strava"
BRANCH="main"
REGION="${AWS_DEFAULT_REGION:-eu-west-1}"
PROFILE_FLAG=""

# Lecture du profil optionnel
if [[ "$1" == "--profile" && -n "$2" ]]; then
  PROFILE_FLAG="--profile $2"
fi

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🏃 Déploiement app-coach sur AWS Amplify${NC}"
echo "  Région : $REGION"
echo "  App    : $APP_NAME"
echo ""

# 1. Créer l'app Amplify
echo -e "${BLUE}[1/5] Création de l'application Amplify...${NC}"
APP_ID=$(aws amplify create-app \
  --name "$APP_NAME" \
  --region "$REGION" \
  $PROFILE_FLAG \
  --query 'app.appId' \
  --output text)

echo "  ✅ App créée : $APP_ID"

# 2. Créer la branche
echo -e "${BLUE}[2/5] Création de la branche '$BRANCH'...${NC}"
aws amplify create-branch \
  --app-id "$APP_ID" \
  --branch-name "$BRANCH" \
  --region "$REGION" \
  $PROFILE_FLAG \
  --output table > /dev/null

echo "  ✅ Branche créée"

# 3. Créer le déploiement et obtenir l'URL pre-signée
echo -e "${BLUE}[3/5] Initialisation du déploiement...${NC}"
DEPLOY_RESULT=$(aws amplify create-deployment \
  --app-id "$APP_ID" \
  --branch-name "$BRANCH" \
  --region "$REGION" \
  $PROFILE_FLAG \
  --output json)

JOB_ID=$(echo "$DEPLOY_RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['jobId'])")
UPLOAD_URL=$(echo "$DEPLOY_RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['zipUploadUrl'])")

echo "  ✅ Job ID : $JOB_ID"

# 4. Uploader le ZIP
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ZIP_PATH="$SCRIPT_DIR/app-coach-deploy.zip"

echo -e "${BLUE}[4/5] Upload du ZIP vers Amplify...${NC}"
curl -s -X PUT \
  -H "Content-Type: application/zip" \
  --data-binary "@$ZIP_PATH" \
  "$UPLOAD_URL"

echo "  ✅ ZIP uploadé"

# 5. Démarrer le déploiement
echo -e "${BLUE}[5/5] Lancement du déploiement...${NC}"
aws amplify start-deployment \
  --app-id "$APP_ID" \
  --branch-name "$BRANCH" \
  --job-id "$JOB_ID" \
  --region "$REGION" \
  $PROFILE_FLAG \
  --output table > /dev/null

echo ""
echo -e "${GREEN}✅ Déploiement lancé avec succès !${NC}"
echo ""
echo "  🌐 URL de votre site :"
echo "  https://$BRANCH.$APP_ID.amplifyapp.com"
echo ""
echo "  Suivez l'avancement dans la console :"
echo "  https://$REGION.console.aws.amazon.com/amplify/apps/$APP_ID"
echo ""

# Sauvegarder les infos dans DEPLOYMENT.md
cat > "$SCRIPT_DIR/artefacts/app-coach/DEPLOYMENT.md" <<EOF
hosted_product_cloud_provider:aws_amplify
hosted_product_url:https://${BRANCH}.${APP_ID}.amplifyapp.com
hosted_product_region:${REGION}
EOF

echo "  📄 DEPLOYMENT.md mis à jour dans artefacts/app-coach/"
