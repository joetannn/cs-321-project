class SkillsComparer:

    #List of strings representing tech words, helps filter out unecessary terms for getExtraJobSkills()
    skillDictionary = []
    jobSkills = []

    def __init__(self, dictionary, jobUrl):
        self.skillDictionary = dictionary
        scraper = JobScraper(jobUrl)
        jobSkills = scraper.scrape()

    #Both arguments are expected to be lists of Strings
    # @return list of strings representing extra skills
    def getExtraJobSkills(self, skillsList):
        extra = [skill for skill in jobSkills if (skill in self.skillDictionary and not (skill in skillsList))]
        return extra

    #Both arguments are expected to be lists of Strings
    # @return list of strings representing extra skills
    def getExtraSkillsListSkills(self, skillsList):
        extra = [skill for skill in skillsList if not skill in jobSkills]
        return extra

comp = SkillsComparer([10, 20, 30, 40, 50])
skillsList = [10, 15, 18, 21, 30, 25, 40]
jobSkills = [10, 20, 30, 40, 50, 55, 25, 18, 17]
extra = comp.getExtraJobSkills(skillsList, jobSkills)
print(extra)
extra = comp.getExtraSkillsListSkills(skillsList, jobSkills)
print(extra)
