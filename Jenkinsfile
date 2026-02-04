pipeline {
    agent any

    environment {
        APP_NAME = "inventario-flores"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Descargando código del repositorio"
            }
        }

        stage('Validación') {
            steps {
                echo "🔍 Validando estructura del proyecto"

                // Asegurar permisos (CLAVE para Windows → Linux)
                sh 'chmod +x scripts/test.sh'

                // Validaciones básicas
                sh 'test -f Dockerfile'
                sh 'test -f docker-compose.yml'
                sh 'test -f app/index.html'
            }
        }

        stage('Pruebas') {
            steps {
                echo "🧪 Ejecutando pruebas automáticas"
                sh './scripts/test.sh'
            }
        }

        stage('Crear Imagen') {
            steps {
                echo "🐳 Construyendo imagen Docker (staging)"
                sh 'docker build -t inventario-flores:staging .'
            }
        }

        stage('Implementar Staging') {
            steps {
                echo "🚀 Desplegando en STAGING"
                sh 'docker compose up -d inventario-staging'
            }
        }

        stage('Aprobación Producción') {
            steps {
                input message: '¿Aprobar despliegue a PRODUCCIÓN?'
            }
        }

        stage('Promover Imagen') {
            steps {
                echo "🏷️ Promoviendo imagen a PRODUCCIÓN"
                sh 'docker tag inventario-flores:staging inventario-flores:production'
            }
        }

        stage('Implementar Producción') {
            steps {
                echo "🚀 Desplegando en PRODUCCIÓN"
                sh 'docker compose up -d inventario-produccion'
            }
        }
    }

    post {
        success {
            echo "🎉 CI/CD completado exitosamente"
        }
        failure {
            echo "❌ El pipeline falló"
        }
        always {
            sh 'docker ps || true'
        }
    }
}
