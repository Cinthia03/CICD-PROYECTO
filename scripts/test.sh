#!/bin/bash
set -e

echo "🔍 Iniciando pruebas del inventario de flores..."

# Verificar que el HTML existe
test -f app/index.html

# Verificar que existe una tabla (con o sin atributos)
grep -qi "<table" app/index.html

# Verificar texto principal (ignora mayúsculas/minúsculas)
grep -qi "inventario de flores" app/index.html

echo "✅ Todas las pruebas pasaron correctamente"
exit 0
