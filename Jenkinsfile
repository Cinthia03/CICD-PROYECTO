pipeline {
    agent any

    environment {
        APP_NAME     = "inventario-flores"
        STAGING_PORT = "8081"
        PROD_PORT    = "8082"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo "📥 Código descargado desde el repositorio"
            }
        }

        stage('Validación / Lint') {
            steps {
                echo "🔍 Validando estructura mínima del proyecto"

                // Asegurar permisos (Windows → Linux)
                sh 'chmod +x scripts/test.sh'

                sh 'test -f Dockerfile'
                sh 'test -f docker-compose.yml'
                sh 'test -f app/index.html'

                echo "✅ Validación completada correctamente"
            }
        }

        stage('Pruebas') {
            steps {
                echo "🧪 Ejecutando pruebas automáticas"
                sh './scripts/test.sh'
            }
        }

        stage('Construir Imagen (Staging)') {
            steps {
                echo "🐳 Construyendo imagen Docker para STAGING"
                sh "docker build -t ${APP_NAME}:staging ."
            }
        }

        stage('Desplegar a Staging') {
            steps {
                echo "🚀 Desplegando aplicación en STAGING (puerto ${STAGING_PORT})"
                sh 'docker compose up -d inventario-staging'
                echo "🌐 Staging disponible en: http://IP-VM:${STAGING_PORT}"
            }
        }

        stage('Aprobación para Producción') {
            steps {
                input message: '¿Aprobar despliegue a PRODUCCIÓN?', ok: 'Sí, desplegar'
            }
        }

        stage('Promover Imagen a Producción') {
            steps {
                echo "🏷️ Promoviendo imagen de STAGING a PRODUCCIÓN"
                sh "docker tag ${APP_NAME}:staging ${APP_NAME}:production"
            }
        }

        stage('Desplegar a Producción') {
            steps {
                echo "🚀 Desplegando aplicación en PRODUCCIÓN (puerto ${PROD_PORT})"
                sh 'docker compose up -d inventario-produccion'
                echo "🌐 Producción disponible en: http://IP-VM:${PROD_PORT}"
            }
        }
    }

    post {
        success {
            echo "🎉 Flujo CI/CD completado exitosamente"
        }
        failure {
            echo "❌ El flujo CI/CD falló. Revisar logs."
        }
        always {
            sh """
            docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}' || true
            """
        }
    }
}