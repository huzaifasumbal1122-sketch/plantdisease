pipeline {
  agent any

  triggers {
    githubPush()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          sh '''
            docker build \
              --build-arg MONGODB_URI=mongodb://plantuser:plantpass@mongo:27017/plant-disease-detector?authSource=admin \
              --build-arg NEXTAUTH_URL=http://51.21.199.94 \
              --build-arg NEXTAUTH_SECRET=CHANGE_ME_TO_A_LONG_RANDOM_SECRET \
              -t amiiir874/plant-disease-detector:latest .
          '''
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        script {
          withCredentials([usernamePassword(
            credentialsId: 'docker-hub',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
          )]) {
            sh '''
              echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
              docker push amiiir874/plant-disease-detector:latest
              docker logout
            '''
          }
        }
      }
    }

    stage('Deploy Part-II') {
      steps {
        sh '''
          docker-compose -f docker-compose.part2.yml down || true
          docker-compose -f docker-compose.part2.yml up -d
          docker ps
        '''
      }
    }
  }
}
