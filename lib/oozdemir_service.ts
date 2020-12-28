import * as core from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3n from '@aws-cdk/aws-s3-notifications';

export class OozdemirService extends core.Construct {
  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    const bucket = new s3.Bucket(this, "oozdemir-csv-s3");
      
    const table = new dynamodb.Table(this, 'oozdemir-csv-dynamodb', {
      partitionKey: { name: 'ID', type: dynamodb.AttributeType.NUMBER }
    });
      
    const handler = new lambda.Function(this, "oozdemir-csv-lambda", {
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.asset("resources"),
      handler: "oozdemir-csv-lambda.lambda_handler",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    bucket.grantReadWrite(handler);
    bucket.addEventNotification(s3.EventType.OBJECT_CREATED_PUT, new s3n.LambdaDestination(handler));
    table.grantFullAccess(handler);

    handler.addEnvironment('TABLE_NAME', table.tableName);

  }
}
