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
                sh 'test -f Dockerfile'
                sh 'test -f docker-compose.yml'
                sh 'test -x scripts/test.sh'
                sh 'test -f app/index.html'
            }
        }

        stage('Tests') {
            steps {
                sh './scripts/test.sh'
            }
        }

        stage('Build Imagen') {
            steps {
                sh 'docker build -t inventario-flores:staging .'
            }
        }

        stage('Deploy Staging') {
            steps {
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
                sh 'docker tag inventario-flores:staging inventario-flores:production'
            }
        }

        stage('Deploy Producción') {
            steps {
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
