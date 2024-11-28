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
                        echo "Build completed successfully"

                    }
                }
            }
        }


        stage('Deploy') {
            steps {
                script {
                    sshagent(['bigrock-ssh-key']) {
                        // Use the 'sh' step to run the SSH commands
                        sh '''
                            echo "Copying files to the server..."
                            scp -o StrictHostKeyChecking=no -r * root@103.211.218.88:/var/www/html/testapi/

                            echo "Running deployment script on the server..."
                            ssh -o StrictHostKeyChecking=no root@103.211.218.88 'bash /var/www/html/testapi/deploy.sh'
                        '''
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
