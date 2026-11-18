pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
        CI = '1'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        skipDefaultCheckout(true)
    }

    parameters {
        choice(name: 'BROWSER', choices: ['all', 'chromium', 'firefox', 'webkit'], description: 'Select the browser for tests')
        choice(name: 'MODE', choices: ['headless', 'headed'], description: 'Select the browser mode')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright tests') {
            steps {
                script {
                    def browserFlag = params.BROWSER == 'all' ? '' : "--project=${params.BROWSER}"
                    def modeFlag = params.MODE == 'headed' ? '--headed' : ''
                    bat "npx playwright test ${browserFlag} ${modeFlag}"
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**,test-results/**', allowEmptyArchive: true
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}
