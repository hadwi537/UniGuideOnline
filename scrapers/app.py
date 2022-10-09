import boto3
from scraper import scrape

client = boto3.client('dynamodb')

def handler(event, context):
    print("in handler")
    paper_list = scrape()
    print("finished scraping")
    for paper in paper_list:
        print(f'putting ${paper} into table')
        data = client.put_item( TableName='paper_table', Item=paper)
    
    return "done"