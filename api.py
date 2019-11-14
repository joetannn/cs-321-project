# To start, command line
# > hug -f api.py


import hug
import base64
import SkillsComparer

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

    api_firstName = firstName
    api_lastName = lastName
    api_position = position
    api_link = link
    #list of skills is array
    api_skills = base64.b64decode(skills).decode('utf-8')
    print(api_skills)
    api_resume = resume
    
    comparer = SkillsComparer('techTerms.txt', api_link)
    extraJobSkills = comparer.getExtraJobSkills(api_skills)
    extraSkillsListSkills = comparer.getExtraSkillsListSkills(api_skills)


    return values


def buildCoverLetter():
    pass


def getExtraSkills():
    pass

print("Running API!")
