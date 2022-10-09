import requests
from html.parser import HTMLParser
import pandas as pd
from bs4 import BeautifulSoup
import re

def scrape():

    subject_to_html = dict()

    class OtagoHTMLParser(HTMLParser):
        def handle_starttag(self, tag, attrs):
            if (len(attrs) > 1):
                if (attrs[1][0] == 'title'):
                    #should use the hanmdle data method
                    subject_to_html[attrs[1][1]] = attrs[0][1]
            
        def handle_endtag(self, tag):
            # print("Encountered an end tag :", tag)
            pass 

        def handle_data(self, data):
            # print("Encountered some data  :", data)
            pass

    parser = OtagoHTMLParser()

    A_Z_papers = requests.get('https://www.otago.ac.nz/courses/subjects/a-z/')
    response = A_Z_papers.text

    parser.feed(response)

    class Paper:
        '''
        The addition of a paper descirption would be a good idea
        '''

        def __init__(self, paper_code, year, title, points, teaching_period, subject, prereq_text, prerequistes = "none", more_info='None'):
            self.paper_code = paper_code
            self.year = year
            self.title = title
            self.points = points
            self.teaching_period = teaching_period
            self.subject = subject
            self.prereq_text = prereq_text
            self.prerequistes = prerequistes
            self.more_info = more_info

        def __repr__(self):
            return str(self.__dict__)


    def get_dl(soup):
        keys, values = [], []
        for dl in soup.findAll("dl"):
            for dt in dl.findAll("dt"):
                keys.append(dt.text.strip())
            for dd in dl.findAll("dd"):
                values.append(dd.text.strip())
        return dict(zip(keys, values))


    subject_paperInfo = dict()
    paper_list = list()
    for subject in subject_to_html.keys(): #tABLES ARE options for degree + all papers
        search = "http://www.otago.ac.nz" + subject_to_html[subject]
        paperHTML =  requests.get(search)

        papers = None
        paper_search_defualt = "https://www.otago.ac.nz/courses/papers/index.html?papercode="
        try:
            list_of_df = pd.read_html(search)
            table_num = len(list_of_df) #include if more than n tables 
            if (table_num > 5): #vauge cutoff point for little v small subjects
                papers = list_of_df[table_num-1]
                papers.columns = [c.replace(' ', '_') for c in papers.columns]
                for row in papers.itertuples():
                    search  = paper_search_defualt + row.Paper_code
                    paperPage = requests.get(search)
                    soup = BeautifulSoup(paperPage.content, "html.parser")
                    dl_dict = get_dl(soup)

                    prereq = "none"
                    prereq_list = []
                    try:
                        prereq = dl_dict["Prerequisite"]
                        # parse the paper codes
                        # Search for all capitalised four letter sequences
                        # Search for all 3 number sequences
                        pattern =  "[A-Z]{4}[\s]?[0-9]{3}" 

                        paper_codes = re.findall(pattern, prereq)
                        prereq_list = []
                        for paper_code in paper_codes:
                            cleaned_paper_code = paper_code.replace(" ", "") #remove all whitespace
                            prereq_list.append(cleaned_paper_code)
                    except:
                        pass

                    print(paper_list)

                    paper_list.append({'paper_code': row.Paper_code, 'year': row.Year, 'title': row.Title, 'points': row.Points, 'teaching_period': row.Teaching_period, 
                    'subject': subject, 'prereq_string': prereq, 'prereq_list': prereq_list, 'dl_dict': dl_dict})

        except Exception as e:
            print("An exception has occured")
            print(e)
        
        # for testing purposes
        if (len(paper_list) > 40):
            break
    return paper_list
