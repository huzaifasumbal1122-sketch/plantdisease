pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'amiiir874'
        APP_NAME = 'plant-disease-detector'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                // Requirement: Build the application in a containerized environment
                sh "docker build -t $DOCKER_HUB_USER/$APP_NAME:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Requirement: Push the code to Docker Hub
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
