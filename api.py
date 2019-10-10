# To start, command line
# > hug -f api.py


import hug


@hug.get('/home')
def root():
    return 'Welcome home!'

@hug.get(examples='first_num=6&second_num=8')
def do_add(first_num: hug.types.number, second_num: hug.types.number):
    return {'Final Result:':{0} + {1}}


print("Running API!")