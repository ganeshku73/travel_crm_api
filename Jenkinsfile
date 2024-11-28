pipeline {
    agent any
    
    environment {
        // Reference the stored MongoDB URI credential
        MONGODB_URI = credentials('MONGODB_URI')  // 'mongodb-uri' is the ID you gave the credential
        JWT_KEY = credentials('JWT_KEY')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm  // This checks out the code from your Git repository
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install'  // Runs on Unix-based systems (Linux/macOS)
                    } else {
                        bat 'npm install'  // Runs on Windows systems
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run build'
                    } else {
                        bat 'npm run build'
                        echo "MongoDB URI: ${env.MONGODB_URI}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    if (isUnix()) {
                        sh './deploy.sh'
                    } else {
                        bat 'deploy.bat'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'This will always run after all stages.'
        }
    }
}
