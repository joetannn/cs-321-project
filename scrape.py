import requests
from bs4 import BeautifulSoup

class JobScraper:

    def __init__(self, url):
        self.url = url
    
    # Scrapes this JobScraper's url and returns a list of all words
    # that are not part of html tags
    def scrape(self):
        r = requests.get(self.url)
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
                #print('Tag'+ str(curTag))
                curTag = ""
            elif(char == '>'):
                if(inTag):
                    #if(curTag == "script"):
                    #    inScript = True
                    #elif(curTag == "/script"):
                    #    inScript = False
                    #print("Tag"+ str(curTag))
                    curTag = ""
                inTag = False
            elif(char == ' ' or char == '\n' or char == '\r' or char == '\t'):
                if(inTag):
                    #if(curTag == "script"):
                    #    inScript = True
                    #elif(curTag == "/script"):
                    #    inScript = False
                    #print("Tag"+ str(curTag))
                    curTag = ""

                if(inWord and (not inScript)):
                    exclude = set('!,.()?~|')
                    curWord = ''.join(char for char in curWord if char not in exclude)
                    #print("Word"+ str(curWord))
                    allWords.append(curWord)
                    curWord = ""
                inWord = False
            else:
                if(not inTag and not inScript):
                    inWord = True
                    curWord = curWord + str(char)
                else:
                    curTag = curTag + str(char)
        
        #should remove duplicates
        return allWords

#Arbitrary job posting for testing
#url = 'https://www.alarm.com/about/open-positions.aspx?gh_jid=4267530002'
#scraper = JobScraper(url)
#allWords = scraper.scrape()

#strip extras
#for word in allWords:
#    if word == '/r' or word == '/n' or word == '':
#        allWords.remove(word)
#
#for word in allWords:
#   print("RAYTHEON POST:" + str(word))
  #  pass


