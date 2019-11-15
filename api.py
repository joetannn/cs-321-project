# To start, command line
# > hug -f api.py


import hug
import base64

from SkillsComparer import SkillsComparer


@hug.response_middleware()
def process_data(request, response, resource):
    response.set_header('Access-Control-Allow-Origin', '*')


@hug.get('/home')
def root():
    return 'Welcome home!'


@hug.get('/add', examples='/add?first_num=6&second_num=8')
def do_add(first_num: hug.types.number, second_num: hug.types.number):
    return {'Final Result:': first_num + second_num}

@hug.get('/send')
def receive_data(firstName: hug.types.text, lastName: hug.types.text, position: hug.types.text, link: hug.types.text, skills: hug.types.text, resume: hug.types.text):

    #debug
    values = {'firstname': firstName, 'lastName': lastName, 'position': position, 'link': link,
               'resume': resume, 'skills': base64.b64decode(skills)}

    skills_class = SkillsComparer()

    api_firstName = firstName
    api_lastName = lastName
    api_position = position
    api_link = link
    #list of skills is array
    api_skills = base64.b64decode(skills).decode('utf-8').split("|")
    api_skills.pop(0)

    #Strip duplicates
    api_skills = list(set(api_skills))
    if api_skills[0] == '':
        api_skills.pop(0)
    print("SKILLS FROM SKILLS LIST: " + str(api_skills))

    # get all the resume stuff, remove duplicates
    api_resume = resume.strip()
    api_resume = list(set(api_resume.split()))
    print("SKILLS FROM RESUME: " + str(api_resume))
    api_resume = skills_class.returnTechTerms(api_resume)
    print("SKILLS FROM RESUME IN SKILLS LIST: " + str(api_resume))

    print("Extending resume to skills list")
    api_skills.extend(api_resume)
    print("FINAL SKILLS LIST: " + str(api_skills))


    scrape_method = skills_class.scrape_link
    scrape_method(api_link)

    extra_skill_call = skills_class.getExtraJobSkills
    extraJobSkills = extra_skill_call(api_skills)
    print("SKILLS FROM Job NOT IN SKILLS_LIST: " + str(extraJobSkills))
    extra_skill_list_call_call = skills_class.getExtraSkillsListSkills
    extraSkillsListSkills = extra_skill_list_call_call(api_skills)
    print("SKILLS FROM SKILLS_LIST NOT IN JOB: " + str(extraSkillsListSkills))

    notInSkillsInJob = "|".join(extraJobSkills)
    notInJobInSkills = "|".join(extraSkillsListSkills)
    inSkillsinJob = ""
    return {'inSkillsinJob':inSkillsinJob,'notInSkillsinJob': notInSkillsInJob, 'notInJobInSkills': notInJobInSkills}


def buildCoverLetter():
    pass


def getExtraSkills():
    pass

print("Running API!")
