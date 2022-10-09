import boto3
from scraper import scrape

client = boto3.client('dynamodb')

def handler(event, context):
    paper_list = scrape()
    for paper in paper_list:
        data = client.put_item( TableName='paper_table', Item=paper)
    
    return "done"