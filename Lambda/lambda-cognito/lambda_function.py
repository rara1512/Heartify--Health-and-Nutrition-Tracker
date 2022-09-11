import json
import boto3
from datetime import datetime


def lambda_handler(event, context):
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    print(dt_string)
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('user-db')
    username = event['userName']
    useremail = event['request']['userAttributes']['email']
    uid = event['request']['userAttributes']['sub']
    response = table.put_item(Item={'username':username, 'useremail':useremail, 'uid': uid, 'date':dt_string})
    return event