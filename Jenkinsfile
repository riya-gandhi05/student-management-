pipeline {
    agent any

    stages {

        stage('Build Image') {
            steps {
                sh """
                docker build -t student-app:${BUILD_NUMBER} .
                docker tag student-app:${BUILD_NUMBER} student-app:latest
                """
            }
        }

        stage('Deploy (FAST)') {
            steps {
                sh """
                docker stop fsdbproject-app || true
                docker rm fsdbproject-app || true
                docker-compose up -d app
                """
            }
        }

        stage('Reload Prometheus') {
            steps {
                sh "docker exec fsdbproject-prometheus-1 kill -HUP 1"
            }
        }
    }
}