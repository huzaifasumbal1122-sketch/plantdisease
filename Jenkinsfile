pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'amiiir874'
        APP_NAME = 'plant-disease-detector'
    }
    stages {
        stage('Build Docker Image') {
            steps {
                sh "docker build --build-arg MONGODB_URI=mongodb://localhost:27017/unused --build-arg NEXTAUTH_URL=http://localhost:3000 --build-arg NEXTAUTH_SECRET=placeholder -t $DOCKER_HUB_USER/$APP_NAME:latest ."
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Using standard shell environment instead of the credentials block
                    // NOTE: You must have run 'docker login' once on your Ubuntu terminal for this to work!
                    sh "docker push $DOCKER_HUB_USER/$APP_NAME:latest"
                }
            }
        }
    }
    post {
        success { echo "Finally Success!" }
    }
}
