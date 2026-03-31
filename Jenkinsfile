pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/riya_gandhi05/Student-Teacher-Devops-.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run App') {
            steps {
                bat 'node server.js'
            }
        }
    }
}
