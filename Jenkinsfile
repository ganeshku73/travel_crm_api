pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ganeshku73/travel_crm_api.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                // Add your deployment commands here (e.g., SSH to server, or using Docker, Kubernetes, etc.)
                sh 'npm run deploy'
            }
        }
    }
}
