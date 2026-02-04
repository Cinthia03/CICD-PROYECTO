#!/usr/bin/env bash
set -e

echo "🔍 Iniciando pruebas del inventario de flores..."

grep -q "Sistema de Inventario de Flores" app/index.html
grep -q "Rosas" app/index.html
grep -q "Tulipanes" app/index.html
grep -q "Orquídeas" app/index.html

echo "✅ Todas las pruebas pasaron correctamente"
