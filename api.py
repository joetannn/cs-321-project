# To start, command line
# > hug -f api.py


import hug
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
def receive_data(firstName: hug.types.text, lastName: hug.types.text, position: hug.types.text, link: hug.types.text = None, skills: hug.types.delimited_list=None, resume: hug.types.text=None):

    #TODO: Add processing
    ret_val = {'firstname': firstName, 'lastName': lastName, 'position': position, 'link': link,
               'resume': resume}

    comparer = SkillsComparer('techTerms.txt', link)
    extraJobSkills = comparer.getExtraJobSkills(skills)
    extraSkillsListSkills = comparer.getExtraSkillsListSkills(skills)

    # json is sending object object for this
    # ret_val['skills'] =  skills
    return ret_val


def buildCoverLetter():
    pass


def getExtraSkills():
    pass

print("Running API!")
