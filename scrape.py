import requests
from bs4 import BeautifulSoup

class JobScraper:

    def __init__(self, url):
        self.url = url
    
    # Scrapes this JobScraper's url and returns a list of all words
    # that are not part of html tags
    def scrape(self):
        r = requests.get(url)
        if(r.status_code != 200):
            print('Unable to access site')

        #soup = BeautifulSoup(r.text, 'html.parser')
        soup = BeautifulSoup(r.text, 'html.parser')
        plaintext = soup.encode("utf-8");

        allWords = []
        curWord = ""
        curTag = ""
        inWord = False
        inTag = False
        inScript = False
        for s in plaintext:
            char = chr(s)
            if(char == '<'):
                inTag = True
                curTag = ""
            elif(char == '>'):
                if(inTag):
                    if(curTag == "script"):
                        inScript = True
                    elif(curTag == "/script"):
                        inScript = False
                    curTag = ""
                inTag = False
            elif(char == ' ' or char == '\n' or char == '\t'):
                if(inTag):
                    if(curTag == "script"):
                        inScript = True
                    elif(curTag == "/script"):
                        inScript = False
                    curTag = ""

                if(inWord and (not inScript)):
                    allWords.append([curWord])
                    curWord = ""
                inWord = False
            else:
                if(not inTag and not inScript):
                    inWord = True
                    curWord = curWord + str(char)
                else:
                    curTag = curTag + str(char)
        
        #TODO get rid of duplicate words?
        return allWords

#Arbitrary job posting for testing
url = 'https://jobs.raytheon.com/job/colorado-springs/mission-assurance-center-system-support-engineer/4679/13244094'
scraper = JobScraper(url)
allWords = scraper.scrape()
for word in allWords:
    print(str(word) + "\n")


