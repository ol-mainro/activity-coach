#!/bin/bash
# Script de push rapide — généré automatiquement par la tâche planifiée du 25/04/2026
cd "$(dirname "$0")"
echo "📤 Push vers origin/main..."
git push origin main && echo "✅ Push réussi !" || echo "❌ Échec du push"
