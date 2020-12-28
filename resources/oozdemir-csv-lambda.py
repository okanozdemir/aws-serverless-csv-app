import json
import csv
import boto3
import os
import datetime as dt

s3 = boto3.client('s3')
dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    
    for record in event['Records']:
        bucket_name = record['s3']['bucket']['name']
        key_name = record['s3']['object']['key']
        
    s3_object = s3.get_object(Bucket=bucket_name, Key=key_name)
    data = s3_object['Body'].read().decode('utf-8').split('\n')
    data = data[:-1]
    
    csv_reader = csv.reader(data, delimiter=',', quotechar='"')
    next(csv_reader)
    
    for row in csv_reader:
        id = row[0]
        name = row[1]
        surname = row[2]
        age = row[3]
        
        dynamodb.put_item(TableName=os.environ['TABLE_NAME'], Item={
            'ID': {'N': str(id)},
            'name': {'S': str(name)},
            'surname': {'S': str(surname)},
            'age': {'N': str(age)},
        })

    return {
        'statusCode': 200,
        'body': json.dumps('The contents of the CSV file was imported to DynamoDB.')
    }
