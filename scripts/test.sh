#!/bin/bash
set -e

echo "🔍 Iniciando pruebas del inventario de flores..."

# 1. Verificar que el HTML existe
test -f app/index.html

# 2. Verificar que existe una tabla (con o sin atributos)
grep -qi "<table" app/index.html

# 3. Verificar que existe la palabra "Inventario" (más flexible)
grep -qi "inventario" app/index.html

echo "✅ Todas las pruebas pasaron correctamente"
exit 0
