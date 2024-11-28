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
                    if (isUnix()) {
                        sshagent(['bigrock-ssh-key']) {
                            // Copy deploy script to the server
                            //sh 'scp -o StrictHostKeyChecking=no deploy.sh root@103.211.218.88:/root/deploy.sh'
                            sh 'scp -o StrictHostKeyChecking=no -r * root@103.211.218.88:/var/www/html/testapi/'
                            // Execute the deploy script on the remote server
                            //sh 'ssh -o StrictHostKeyChecking=no root@103.211.218.88 "bash /root/deploy.sh"'
                            sh 'ssh -o StrictHostKeyChecking=no root@103.211.218.88 "bash /var/www/html/testapi/deploy.sh"'
               
                        }
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
