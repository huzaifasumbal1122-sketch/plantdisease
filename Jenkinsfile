pipeline {
    agent any

    environment {
        // Your Docker Hub details [cite: 13]
        DOCKER_HUB_USER = 'amiiir874'
        APP_NAME = 'plant-disease-detector'
    }

    stages {
        stage('Fetch Code') {
            steps {
                // Requirement: Use Git plugin to fetch code [cite: 21]
                git branch: 'main', url: 'https://github.com/huzaifasumbal1122-sketch/plantdisease'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Requirement: Build image in a containerized environment [cite: 21]
                sh "docker build -t $DOCKER_HUB_USER/$APP_NAME:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                // Requirement: Push the built image to Docker Hub [cite: 13]
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
            echo "Deployment Pipeline Successful! Image pushed to Docker Hub."
        }
        failure {
            echo "Pipeline Failed. Check Jenkins logs for errors."
        }
    }
}
