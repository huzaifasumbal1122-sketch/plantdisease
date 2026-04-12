pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'amiiir874'
        APP_NAME = 'plant-disease-detector'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                // We don't need the 'git' step here because Jenkins 
                // already checked out the code at the start.
                sh "docker build -t $DOCKER_HUB_USER/$APP_NAME:latest ." [cite: 13, 21]
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "echo $PASS | docker login -u $USER --password-stdin" [cite: 13]
                        sh "docker push $DOCKER_HUB_USER/$APP_NAME:latest" [cite: 13]
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo "CI/CD Pipeline Successful!" [cite: 16]
        }
        failure {
            echo "Pipeline Failed. Check logs."
        }
    }
}
