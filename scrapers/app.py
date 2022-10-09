import boto3
from scraper import scrape
import re

client = boto3.client('dynamodb')

def handler(event, context):
    print("in handler")
    paper_list = scrape()
    print("finished scraping")
    for paper in paper_list:
        print(type(paper))
        print("####\n" + str(paper) + "####\n")
        print(paper['paper_code'])
        print(f'putting ${paper} into table')
        parse_nums = "[0-9]+"
        paper['points'] = int(re.match(parse_nums, paper['points']).group(0))
        data = client.put_item( 
            TableName='paper_table', 
            Item = {
                "paper_code": {
                    'S': paper['paper_code']
                },
                "year": {
                    'S': str(paper['year'])
                },
                "title": {
                    'S': paper['title']
                },
                'points': {
                    'N': paper['points']
                },
                'subject': {
                    'S': paper['subject']
                },
                'prereq_string': {
                    'S': paper['prereq_string']
                },
                'prereq_list': {
                    'SS': paper['prereq_list']
                }
            })
    
    return "done"