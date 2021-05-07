<<<<<<< HEAD
### CI/CD PIPELINE TO DEPLOY A REACT APP

## BRIEF WORKFLOW

Developers commit/push latest code into the master branch of the remote git repository.

Upon changes made to the repository, based on the configured event triggers, git sends a POST request to each of the external services' URL's specified in the repository general settings under the Webhooks section.

This POST request triggers a Jenkins job to clone the code repository in its local workspace.

After cloning the remote repository in the local workspace, the job finds the Jenkinsfile and then runs the declarative/groovy script which creates a CI/CD pipeline and starts executing the stages and their respective steps defined/declared inside the Jenkinsfile.

### STAGES IN A TYPICAL CI/CD PIPELINE

Each of the following stages run sequentially one after the other depending on the order in the Jenkinsfile and if one of the steps inside a stage fail then the following steps and stages are skipped and the job ends in a FAILURE.

The first stage in a CI/CD pipeline would be to checkout souce control management and clone the latest code into the local workspace, upon success it moves to the next stage.

The send stage is to create a production build by installing all the dependencies of the application.

Then follows the testing stage, where all the test scripts are executed.

Then follows the release stage, where the necessary infrastucture is provisioned using IaaC tools like Terraform, AWS Cloudformation, etc,.

Then follows the deployment stage, where a docker image of the application is created using a docker client and this docker image is pushed to a remote docker repository like dockerhub or AWS ECR, etc and then that is image is pulled on the remote application host machine and upon running the image it creates an application container which serves the application.

## REQUIRED TOOLS

VSCODE(EDITOR)

GIT

JENKINS

SOCKETXP

AWS

AWS CLI TOOLS

AWS ELASTIC CONTAINER REGISTRY

TERRAFORM

DOCKER DESKTOP

## VSCODE

VS Code can be downloaded here https://code.visualstudio.com/download

It is recommended to install the extensions GitHub Pull Requests and Issues and Docker as they come in very helpful moving further into the project.

## GIT

Git is a software for tracking changes in any set of files, usually used for coordinating work among programmers collaboratively developing source code during software development. Its goals include speed, data integrity, and support for distributed, non-linear workflows (thousands of parallel branches running on different systems).

Before installing git locally click here https://github.com/ to sign in to or sign up for new github account and create a new project repository.

In the context of this project, git is used to pull the code from the master branch of the remote repository, create a feature branch in the local repository, add new code/ changes, stage and commit the code in the local repository, push it into the remote repository, create a new pull request to merge the feature branch into the master branch in the remote repository, review the code and resolve merge conflicts if any, merge the feature branch, close the feature branch(not mandatory).

### GIT INSTALLATION AND CONFIGURATION

Git can be installed on a mac using Homebrew

```shell
brew install git
```

Configuring user information using the following commands:

```shell
git config --global user.name "firstname lastname"
git config --global user.email "valid-email(usually the email associated with remote git account)"
```

To create a local git repository, navigate into the workspace of the project in the terminal and execute the following command

```shell
git init
```

To synchronize with the local git repository with the remote repository can be done in two different ways, the steps mentioned below are slightly better. If VSCode github extension is already installed, the last two steps can be skipped as VS Code does all that itself when the synchronize changes option is clicked on at the bottom left, next to the beanch name.

```shell
git clone remote-repository-url
git remote add origin remote-repository-url
cd project-directory        #enter into the project root directory
git push -u origin master
git pull
```

Now since the upstream has been set simple, git pull and git push commands would pull from and push to the remote repository.

## JENKINS

Jenkins is a JAVA based software tool that can be used to create and automate a CI/CD pipeline job

Since it is a java application, the host running Jenkins has to have JDK installed as it is a dependency

### JENKINS INSTALLATION AND CONFIGURATION

This is the official documentation to install Jenkins for all Operating Systems: https://www.jenkins.io/doc/book/installing/

On Mac OS, Jenkins can be installed with Homebrew https://www.jenkins.io/download/lts/macos/ or with Docker

This article is a good resource to install and configure Jenkins on mac OS: https://coralogix.com/log-analytics-blog/how-to-install-and-configure-jenkins-on-the-mac-os/

### INSTALLING REQUIRED PLUGINS

After successfully logging into Jenkins Dashboard, navigate into Manage Jenkins -> Manage Plugins to ensure the following plugins are installed, if not, install them as they are neceassary and/or might be very useful for some complex jobs for configuring the pipeline job

Amazon Web Services SDK

Apache HttpComponents Client 4.x API Plugin

Authentication Tokens API Plugin

Branch API

Checks API plugin

CloudBees AWS Credentials Plugin

Credentials Binding Plugin

Credentials Plugin

Docker API Plugin

Docker Commons Plugin

Docker Pipeline

docker-build-step

Durable Task

Git client plugin

Git plugin

GitHub API Plugin

GitHub Branch Source Plugin

GitHub plugin

NodeJS Plugin

Pipeline

Pipeline: API

Pipeline: AWS Steps

Pipeline: Basic Steps

Pipeline: Build Step

Pipeline: Declarative

Pipeline: Declarative Extension Points API

Pipeline: GitHub Groovy Libraries

Pipeline: Groovy

Pipeline: Input Step

Pipeline: Job

Pipeline: Milestone Step

Pipeline: Model API

Pipeline: Multibranch

Pipeline: Nodes and Processes

Pipeline: REST API Plugin

Pipeline: SCM Step

Pipeline: Shared Groovy Libraries

Pipeline: Stage Step

Pipeline: Stage Tags Metadata

Pipeline: Stage View Plugin

Pipeline: Step API

Pipeline: Supporting APIs

Plain Credentials Plugin

Plugin Utilities API Plugin

Popper.js API Plugin

Resource Disposer Plugin

Run Condition Plugin

SCM API Plugin

Script Security Plugin

Snakeyaml API Plugin

SSH Agent Plugin

SSH Build Agents plugin

SSH Credentials Plugin

Structs Plugin

Terraform Plugin

Timestamper

Token Macro Plugin

Trilead API Plugin

Variant Plugin

Workspace Cleanup Plugin

After installing all the above plugins stop and start the Jenkins application

## CREATE A NEW PIPELINE JOB

Navigate to Dashboard, click on New Item, give the new job a name and select the option "Pipeline" below and click "OK" to create a new job

### JOB CONFIGURATION

Next the job configuartion pops up, under build triggers, select the option, "GitHub hook trigger for GITScm polling", this enables, If Jenkins will receive PUSH GitHub hook from repo defined in Git SCM section it will trigger Git SCM polling logic. So polling logic in fact belongs to Git SCM.

Under the Pipeline section, select "Pipeline script from SCM" under the definition dropdown, select Git under the SCM dropdown and provide the github url to the repository where the code will be pushed in the Repository URL and the also provide the credentials to the repository under the credential section.

If credentials have not been configured, click on add -> click Jenkins credentials provider to add credentials globally so that they can be saved on Jenkins and be further used in other jobs. Since this is github credentials select the kind of credentials to pass, this can be normal user name and password or the SSH user private key that Jenkins would use to access private repositories, if the repository is public there is no requirement to provide credentials and this can be skipped.

Under branches to build specify the branch of the repository (in this case, master branch) where the Jenkinsfile would be available.

Under script path type "Jenkinsfile", this tells Jenkins that the name of the pipeline script is Jenkinsfile

Click save.

### JENKINSFILE

## SOCKETXP

For security purposes Jenkins is normally set up to run behind a firewall and when git attempts to send a POST request using webhook on committing changes to the repository, this request never reaches the Jenkins application as the firewall blocks this request as it is sent over an unsecure protocol. Subsequently Jenkins never gets notified upon changes committed to the repository.

In order to circumvent this issue, SocketXP is used. SocketXP receives the git webhook notifications and creates a secure https tunnel and forwards it to Jenkins which is running behind the firewall. This way Jenkins is notified of changes made to a git repository.

### SOCKETXP INSTALLATION AND CONFIGURATION

Download SocketXP from https://www.socketxp.com/download and then install it.

On the same web page under Step 2. Authenticate, click on "SIGN UP FOR FREE" to create a free account.

Once Logged into dahsboard, click on the options icon on the top-left of the page, click on "Auth Token" and copy "Login Command", paste it in the terminal and hit enter to run it; this authenticates the socketxp client with the created account token and now SocketXP is ready to be used.

Now run the following command in the terminal, socketxp connect http://localhost:8080, this creates a secure connection between the Jenkins application and the SocketXP client and on success returns a public URL where the socketxp will be listening and upon receving requests sent to this URL SocketXP forwards it over to Jenkins application which is running on the localhost:8080. Copy this public URL. Navigate to the github repository, click on "Settings -> Webhooks -> Add webhook", paste the url into "Payload URL" and append "/github-webhook/" at the end of the pasted URL, the URL should look like this, "https://????-######.socketxp.com/github-webhook/" , select a Content type, add the SocketXP token into the "Secret", select the kind of events that triggers this webhook(for this project select "Just the push event") and then click "Add webhook" to finish this configuration. Note: After executing socketxp connect http://localhost:8080 and receiving the public URL do not exit out of the terminal or exit/terminate out of this process as it would close this connection between SocketXP and Jenkins, so instead create a new terminal tab for using terminal.

## AWS

Amazon Web Services is a subsidiary of Amazon providing on-demand cloud computing platforms and APIs to individuals, companies, and governments, on a metered pay-as-you-go basis.

Create a free AWS account here https://portal.aws.amazon.com/billing/signup#/start

After signing up the access given is of the root user and it is very insecure to sign in as a root user all the time so another user has to be created and the required access can be granted to the user, navigate into the dashboard, type IAM (Identity and Access Management) in the search bar at the top, click on Users option in the menu on the left, click the button "Add user". Give the user a name and check the box, "Programmatic access" for the Access type, click "next". In the next page, select "Attach existing policies directly", and type "PowerUserAccess" and select it and click next, it is optional to give a tag and a value, click next and then finally click "Create user". Copy the "Access key ID" and the "secret access key" and save them safely as the secret access key can only be seen now and cannot be recovered again. So if they are ever lost, they have to created again from "My Security Credentials" option in the user dropdown placed on the right of the notification bell icon of the header of the web page.

These credentials are used for access AWS through CLI (AWS), API (terraform AWS provider), SDK (Jenkins) moving further into the project.

### AWS CLI TOOLS

Follow the instructions mentioned in the below link to install and configure aws cli.
https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html.

Note: The AWS cli has to be definitely configured with aws credentials. So the steps in the above link definitely have to be followed all the way.

### AWS ELASTIC CONTAINER REGISTRY

AWS ECR is the a docker image storage repository.

After building a docker image of the application using the Dockerfile, Jenkins pushes the newly created docker image into the ECR repository and then pulls that image into the EC2 instance during the "DEPLOYMENT" stage by SSH'ing into the EC2 instance and run the docker image to deploy the application.

Navigate into ECR, click on "Create repository", do not change any default settings, give the repository a name and then click on "Create repository". Save URI of the repository as it is necessary inside the Jenkinsfile.

## TERRAFORM

Terraform is an Infrastructure Provisioning tool that has a wide range of providers that enable it to provision infrastructure resources over a wide range of cloud platforms like Amazon Web Services, Microsoft Azure, Google Cloud Platform, Digital Ocean, etc.

This is a link to the official terraform registry which consists of all providers: https://registry.terraform.io/browse/providers

For this project, infrastructure is provisioned on AWS.

### TERRAFORM INSTALLATION

```shell
brew install terraform
```

### TERRAFORM FILES

Navigate into the local git repository of the project and add two new files into the root directory named "main.tf" and "terraform.tfvars" respectively. Add another file and name it ".gitignore" and add the terraform.tfvars file into it.

The terraform.tfvars holds the values of all the environment variables in the local repository and it can contain some very sensitive information in it, for instance, aws credentials, so it is very important that this file is never pushed into the remote repository as it would expose sensitive information, hence place it into .gitignore file.

The main.tf file contains all the resources that are to be provisioned and all the software that is to be installed on the EC2 instance after its creation.

For creating, accessing and hosting web servers on AWS, the following nine resources are required to be configured:

Vitual Private Cloud

Internet Gateway

Subnet

Security Group

Route Table

Network Interface

Route Table Association

Elastic IP

EC2

### TERRAFORM COMMANDS

```shell
terraform init
```

This command initializes the provider package mentioned in main.tf, that is required to provision all the resources, in the context of this project it installs the aws provider package into ".terraform" file and also creates a .terraform.lock.hcl file, these two files have to be added into the .gitignore file.

```shell
terraform apply -var "aws_access_key=$AWS_ACCESS_KEY" -var "aws_secret_key=$AWS_SECRET_KEY" --auto-approve
```

This command executes the main.tf file and passes aws credentials as parameters to terraform in order to log into aws and start spinning up all the resources and at the end returns the public IP address of the EC2 instance as the output in the console. During execution it creates two new files, "terraform.tfstate" and "terraform.tfstate.backup", these are the terraform state files that have the information about the current state of the aws platform and conatins the information of all the resources and their current state. Terraform looks into this state file and compares it with all the resources defined in the main.tf file and if there are any resources in the main.tf file that are not inside the state file then it creates that resources on aws and refreshes the state to grab the latest state. These two files also have to be added into the .gitignore file.

Note: It is necessary to provide aws credentials to terraform so that it can log into the aws account and start creating resources. Since we do not publish terraform.tfvars file which holds the credentials in the local file system to github repository for security purposes, this is how credentials are passed into terraform using -var parameter in the terminal command.

After creating all the resources, terraform runs the shell script defined in the user_data value inside the EC2 definition.

The script defined as user_data value does the following:

Updates the Advanced Packaging Tool

Updates apt-get utility

Confirms if any previous versions are already present on the system and if it exists immediately removes it

Starts installing the latest version of docker software from the official docker repository https://docs.docker.com/engine/install/ubuntu/

Adds the user "Ubuntu" to the docker group

Installs latest version of awscli tool

Configures aws credentials passed as parameters into the EC2 instance

```shell
terraform destroy --auto-approve
```

This command refreshes the state, examines the status of all the resources and destroys all the resources mentioned in the main.tf file and refreshes the state files upon completion.

## DOCKER DESKTOP

### DOCKER DESKTOP INSTALLATION

Follow the instructions from the official docker documentation to download and install docker.
https://docs.docker.com/get-docker/

### DOCKERFILE
=======
### CI/CD PIPELINE TO DEPLOY A REACT APP 

# \* INSTALLING JENKINS
>>>>>>> 68a58c73690669342fa8e0efe673b1d1ce63e92c
