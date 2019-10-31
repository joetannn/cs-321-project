# To start, command line
# > hug -f api.py


import hug


@hug.response_middleware()
def process_data(request, response, resource):
    response.set_header('Access-Control-Allow-Origin', '*')


@hug.get('/home')
def root():
    return 'Welcome home!'


@hug.get('/add', examples='/add?first_num=6&second_num=8')
def do_add(first_num: hug.types.number, second_num: hug.types.number):
    return {'Final Result:': first_num + second_num}

def buildCoverLetter():
    pass


def getExtraSkills():
    pass

print("Running API!")
