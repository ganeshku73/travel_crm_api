pipeline {
    agent any

    environment {
        // Reference the stored MongoDB URI and JWT credentials
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
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Starting deployment..."
                    
                    // Manually start SSH agent and add the SSH key
                    if (isUnix()) {
                        sh '''
                            echo "Starting SSH agent..."
                            eval $(ssh-agent -s)  # Start the ssh-agent process
                            echo "Adding SSH private key..."
                            ssh-add <(echo "$SSH_PRIVATE_KEY")  # Add the private key (ensure it is set correctly)

                            echo "Copying files to the server..."
                            scp -o StrictHostKeyChecking=no -r * root@103.211.218.88:/var/www/html/testapi/
                            
                            # Check if SCP command was successful
                            if [ $? -eq 0 ]; then
                                echo "Files copied successfully."
                            else
                                echo "Failed to copy files."
                                exit 1
                            fi

                            echo "Running deployment script on the server..."
                            ssh -o StrictHostKeyChecking=no root@103.211.218.88 'bash /var/www/html/testapi/deploy.sh'

                            # Check if SSH command was successful
                            if [ $? -eq 0 ]; then
                                echo "Deployment script executed successfully."
                            else
                                echo "Failed to execute deployment script."
                                exit 1
                            fi

                            # Kill the agent after deployment
                            ssh-agent -k
                        '''
                    } else {
                        // Windows alternative for starting ssh-agent and adding key (if required)
                        bat '''
                            echo Starting SSH agent...
                            start-ssh-agent
                            ssh-add $env.SSH_PRIVATE_KEY

                            echo "Copying files to the server..."
                            scp -o StrictHostKeyChecking=no -r * root@103.211.218.88:/var/www/html/testapi/

                            echo "Running deployment script on the server..."
                            ssh -o StrictHostKeyChecking=no root@103.211.218.88 'bash /var/www/html/testapi/deploy.sh'

                            echo "Stopping SSH agent..."
                            stop-ssh-agent
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

        success {
            echo 'Deployment succeeded.'
        }

        failure {
            echo 'Deployment failed.'
        }
    }
}
