from scrape import JobScraper

class SkillsComparer:

    #List of strings representing tech words, helps filter out unecessary terms for getExtraJobSkills()
    skillDictionary = []
    jobSkills = []

    def __init__(self):
        dictionary = []
        try:
            techTerms = open('techTerms.txt','r')
            for line in techTerms:
                dictionary.append(line.rstrip())
        except:
            techTerms.close()
        self.skillDictionary = dictionary
        # debug if necessary
        # print("SKILL DICTIONARY: " + str(self.skillDictionary))

    def scrape_link(self, jobUrl):
        scraper = JobScraper(jobUrl)
        self.jobSkills = scraper.scrape()
        #print("SCRAPED SKILLS: " + str(self.jobSkills))

    def returnTechTerms(self, resume_list):
        answer_list = []
        for i in resume_list:
            if i in self.skillDictionary:
                answer_list.append(i)

        return answer_list

    def getSimilarSkills(self, skillsList):
        validJobSkills = [skill for skill in self.jobSkills if skill in self.skillDictionary]
        similar = [skill for skill in validJobSkills if skill in skillsList]
        return similar

    #Both arguments are expected to be lists of Strings
    # @return list of strings representing extra skills
    def getExtraJobSkills(self, skillsList):
        extra = [skill for skill in self.jobSkills if (skill in self.skillDictionary and not (skill in skillsList))]
        return extra

    #Both arguments are expected to be lists of Strings
    # @return list of strings representing extra skills
    def getExtraSkillsListSkills(self, skillsList):
        extra = [skill for skill in skillsList if not skill in self.jobSkills]
        return extra

#comp = SkillsComparer()
#skillsList = ['Java', 'C++', 'Sleeping']
#url = 'https://jobs.raytheon.com/job/dulles/software-engineer-i/4679/14033015?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic'
#comp.scrape_link(url)
#similar = comp.getSimilarSkills(skillsList)
#print(similar)
#extra = comp.getExtraSkillsListSkills(skillsList)
#print(extra)
