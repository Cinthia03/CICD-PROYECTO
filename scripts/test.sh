#!/bin/bash
set -e

echo "🔍 Iniciando pruebas del inventario de flores..."

# Verificar que el HTML existe
test -f app/index.html

# Verificar elementos clave del sistema
grep -q "<table>" app/index.html
grep -q "Inventario de Flores" app/index.html

echo "✅ Todas las pruebas pasaron correctamente"
