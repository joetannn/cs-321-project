class SkillsComparer:

    #List of strings representing tech words, helps filter out unecessary terms for getExtraJobSkills()
    skillDictionary = []

    def __init__(self, dictionary):
        self.skillDictionary = dictionary

    #Both arguments are expected to be lists of Strings
    # @return list of strings representing extra skills
    def getExtraJobSkills(self, skillsList, jobSkills):
        pass

    #Both arguments are expected to be lists of Strings
    # @return list of strings representing extra skills
    def getExtraSkillsListSkills(self, skillsList, jobSkills):
        pass
