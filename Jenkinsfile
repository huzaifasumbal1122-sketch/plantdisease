pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'amiiir874'
        APP_NAME = 'plant-disease-detector'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                // This builds the image using the Dockerfile in your repo
                sh "docker build -t $DOCKER_HUB_USER/$APP_NAME:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // This logs into Docker Hub and pushes the image
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
            echo "CI/CD Pipeline Successful!"
        }
        failure {
            echo "Pipeline Failed. Check Jenkins logs for errors."
        }
    }
}
