pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'amiiir874'
        APP_NAME = 'plant-disease-detector'
        // Dummy URI to satisfy the Next.js build check
        BUILD_MONGO_URI = 'mongodb://localhost:27017/unused'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                // We pass the MONGODB_URI as a build argument so the 'npm run build' doesn't crash
                sh "docker build --build-arg MONGODB_URI=${BUILD_MONGO_URI} -t $DOCKER_HUB_USER/$APP_NAME:latest ."
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
            echo "CI/CD Pipeline Successful!"
        }
        failure {
            echo "Pipeline Failed. Check logs for MONGODB_URI errors."
        }
    }
}
