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
                   // Define SCP command
                    def command = '''scp -o StrictHostKeyChecking=no -r C:\\Users\\thinkpad\\.jenkins\\workspace\\tripmydeal_api\\* root@103.211.218.88:/var/www/html/testapi/'''

                    // Execute the SCP command
                    def process = command.execute()

                    // Wait for the command to complete
                    process.waitFor()

                    // Check the exit value (success = 0)
                    if (process.exitValue() == 0) {
                        echo "Deployment successful"
                    } else {
                        // Log error if SCP fails
                        echo "Error during file copy: ${process.err.text}"
                        echo "Exit code: ${process.exitValue()}"
                        echo "Output: ${process.text}"
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
