import boto3
from scraper import scrape

client = boto3.client('dynamodb')

def handler(event, context):
    print("in handler")
    paper_list = scrape()
    print("finished scraping")
    for paper in paper_list:
        paper = paper[0]
        print(type(paper))
        print(paper)
        print(f'putting ${paper} into table')
        data = client.put_item( 
            TableName='paper_table', 
            Item = {
                "paper_code": {
                    'S': paper.paper_code
                },
                "year": {
                    'S': paper.year
                },
                "title": {
                    'S': paper.title
                },
                'points': {
                    'S': paper.points
                },
                'subject': {
                    'S': paper.subject
                },
                'prereq_string': {
                    'S': paper.prereq_string
                },
                'prereq_list': {
                    'SS': paper.prereq_list
                }
            }
            )
    
    return "done"