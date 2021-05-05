pipeline {

    agent any

    environment {
        AWS_ACCESS_KEY = credentials('AWS_ACCESS_KEY')
        AWS_SECRET_KEY = credentials('AWS_SECRET_KEY')
        def IP = ''
        def ECR = "308682804621.dkr.ecr.us-east-1.amazonaws.com"
    }

    tools {

        terraform "Terraform"
        nodejs "Node-15.11"
    }

    stages {

        // stage("BUILD") {
            
        //     steps {

        //         sh "npm install"
        //     }

        // }

        // stage("TEST") {

        //     steps {

        //     }

        // }

        stage("INFRASTRUCTURE PROVISIONING") {

            steps {

                sh "terraform init"

                //sh "terraform destroy --auto-approve"

                script {

                    def temp = sh(script: 'terraform apply -var "aws_access_key=$AWS_ACCESS_KEY" -var "aws_secret_key=$AWS_SECRET_KEY" --auto-approve | grep public_ip | xargs', returnStdout: true).trim()			
			        def ip = temp.split()[2].trim()
			        def s = ip.indexOf("[")
			
			        if(s) {
				        IP = ip[0..s-1]
			        }
			        else {IP = ip}
                    	sh "echo ${IP[0..-2]} >> ipaddresslist.txt"
                    
                }
            }
        }


        stage("DEPLOY") {

            steps {
                
                sh "echo deploy" 

                sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ECR}"
                sh "docker build -t ${ECR}/project:app-V${BUILD_NUMBER} ."
                sh "docker push ${ECR}/project:app-V${BUILD_NUMBER}" 
            }
            
        }


        stage("RELEASE") {
		    
		    steps {
		    	sh("sleep 240")
		    	sh("echo waiting...")

              		sshagent(['SSH_AUTH']) {
		       
                       		//sh("ssh -o StrictHostKeyChecking=no ubuntu@${IP[0..-2]} ls -a")
                       		sh("ssh -o StrictHostKeyChecking=no ubuntu@${IP[0..-2]} docker stop \$(docker ps -aq) || true")
                       		sh("ssh -o StrictHostKeyChecking=no ubuntu@${IP[0..-2]} docker system prune -af")
		       		        sh("ssh -tt -o StrictHostKeyChecking=no ubuntu@${IP[0..-2]} << EOF sudo aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ECR}; docker pull ${ECR}/project:app-V${BUILD_NUMBER}; docker run -d -p 8080:5000 --name appcontainer ${ECR}/project:app-V${BUILD_NUMBER} EOF") 
                       		//sh("ssh -tt -o StrictHostKeyChecking=no ubuntu@${IP[0..-2]} docker run -d -p 8080:8080 --name container ${ECR}/project:app-V${BUILD_NUMBER}")
	       		    } 
	    
	    
	    		}
	    }


    }


}
