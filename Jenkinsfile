pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/riya-gandhi05/Student-Teacher-Devops-.git'
            }
        }

        stage('Clean Docker') {
            steps {
                sh 'docker-compose down -v --remove-orphans || true'
            }
        }

        stage('Fix Prometheus') {
            steps {
                sh '''
                    rm -rf prometheus.yml
                    printf 'global:\\n  scrape_interval: 15s\\n\\nscrape_configs:\\n  - job_name: prometheus\\n    static_configs:\\n      - targets:\\n          - localhost:9090\\n  - job_name: student-app\\n    static_configs:\\n      - targets:\\n          - app:4000\\n' > prometheus.yml
                    echo "prometheus.yml created:"
                    cat prometheus.yml
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t student-app .'
            }
        }

        stage('Run Docker Compose') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }
}