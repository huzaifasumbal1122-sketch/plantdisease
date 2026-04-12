pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'amiiir874'
        APP_NAME = 'plant-disease-detector'
        B_MONGO = 'mongodb://localhost:27017/unused'
        B_URL = 'http://localhost:3000'
        B_SECRET = 'placeholder_secret'
    }

    stages {
        stage('Build Docker Image') {
            steps {
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
                    // Changed to 'dockerhub_final' to match new credential
                    withCredentials([usernamePassword(credentialsId: 'dockerhub_final', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "echo \$PASS | docker login -u \$USER --password-stdin"
                        sh "docker push $DOCKER_HUB_USER/$APP_NAME:latest"
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo "CI/CD Pipeline Successful! All Marks Secured."
        }
        failure {
            echo "Pipeline Failed. Double check Credential ID 'dockerhub_final'."
        }
    }
}
