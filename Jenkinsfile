pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'amiiir874'
        APP_NAME = 'plant-disease-detector'
        // Build arguments to satisfy Next.js security checks
        B_MONGO = 'mongodb://localhost:27017/unused'
        B_URL = 'http://localhost:3000'
        B_SECRET = 'placeholder_secret_for_build_only'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                // Passing all required ARGs to prevent the "Invalid URL" error
                sh """
                docker build \
                --build-arg MONGODB_URI=${B_MONGO} \
                --build-arg NEXTAUTH_URL=${B_URL} \
                --build-arg NEXTAUTH_SECRET=${B_SECRET} \
                -t $DOCKER_HUB_USER/$APP_NAME:latest .
                """
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh "docker push $DOCKER_HUB_USER/$APP_NAME:latest"
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo "CI/CD Pipeline Successful! Image pushed to Docker Hub."
        }
        failure {
            echo "Pipeline Failed. Check logs for build-arg issues."
        }
    }
}
