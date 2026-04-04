pipeline {
    agent any

    stages {

        stage('Clean Docker') {
            steps {
                sh '''
                docker rm -f fsdbproject-app-1 || true
                docker rm -f fsdbproject-mysql-1 || true
                docker rm -f fsdbproject-prometheus-1 || true
                docker rm -f fsdbproject-grafana-1 || true
            
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
                sh 'docker-compose -p fsdbproject up -d --build app mysql prometheus grafana'
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