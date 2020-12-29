# aws-serverless-csv-app
An AWS CDK project which works as a CSV importer into AWS DynamoDB via AWS Lambda functions 

## Description
The application runs an [AWS Lambda](https://aws.amazon.com/lambda/) function that will be triggered when a [CSV file](test.csv) is uploaded to a spesific [AWS S3](https://aws.amazon.com/s3/) bucket and with this Lambda function, inserts the data, contained in the CSV file, to [AWS DynamoDB](https://aws.amazon.com/dynamodb/). The entire infrastructure of the application is created with [AWS CDK](https://aws.amazon.com/cdk/), which is a infrastructure as a code (IaC) framework.

## Usage

### Prerequisites
This AWS CDK project is developed with TypeScript and you can find out how to meet the prerequisites from the [link](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_prerequisites)

### Run the project
- Install the requirements with:
`npm update` 

- Synthesize an AWS CloudFormation template
`cdk synth` 

- Deploying the stack
`cdk deploy` 

## Explanation of the tech stack for those wondering
The main purpose of the project was to develop a lambda function that will work as a CSV importer into any data storage. I chose AWS DynamoDB as the data storage service because it is easy to integrate with other AWS products. In addition, AWS DynamoDB is a highly scalable managed service. I developed the Lambda function using the Python 3.8 because it was very practical for CSV parsing and I'm used to developing with it. AWS CDK is way simpler to use than Cloudformation templates or Terraform.
