pipeline {
    agent any

    stages {

        stage('Clean Docker') {
            steps {
                sh '''
                docker-compose -p fsdbproject down --remove-orphans
                docker system prune -f
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
                sh 'docker-compose -p fsdbproject up -d --build'
            }
        }

        stage('Configure Prometheus') {
            steps {
                sh '''
                docker exec fsdbproject-prometheus-1 sh -c "cat > /etc/prometheus/prometheus.yml << EOF
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets:
          - localhost:9090
  - job_name: student-app
    static_configs:
      - targets:
          - app:4000
EOF"
                docker exec fsdbproject-prometheus-1 kill -HUP 1
                '''
            }
        }

    }
}