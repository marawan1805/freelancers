import json
import boto3
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import BotoCoreError, ClientError
from boto3.dynamodb.conditions import Or
import decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Freelancers')

# Here we define a custom JSON encoder that can handle Decimal types,
# since DynamoDB uses Decimal types to represent numbers
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

# This function adds CORS headers to the response
def add_cors_headers(response):
    response['headers'] = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }
    return response

# This function returns all freelancers, or all freelancers that match a search term
def search_freelancers(event, context):
    try:
        # Getting the query parameter from the request
        query_params = event['queryStringParameters']
        search_term = query_params.get('search')

        # Defining attributes to search in
        search_attributes = ['id','first_name', 'last_name', 'email', 'skill', 'social_media_followers']

        # Building the filter expression
        filter_expression = None
        for attribute in search_attributes:
            if filter_expression is None:
                filter_expression = Attr(attribute).contains(search_term)
            else:
                filter_expression = filter_expression | Attr(attribute).contains(search_term)

        response = table.scan(
            FilterExpression=filter_expression
        )

        response = {
            "statusCode": 200,
            "body": json.dumps(response['Items'], cls=DecimalEncoder)
        }

        return add_cors_headers(response)

    except (BotoCoreError, ClientError) as e:
        response = {
            "statusCode": 500,
            "body": "An error occurred while searching freelancers: " + str(e)
        }
        return add_cors_headers(response)
    except Exception as e:
        response = {
            "statusCode": 500,
            "body": "An unknown error occurred: " + str(e)
        }
        return add_cors_headers(response)
