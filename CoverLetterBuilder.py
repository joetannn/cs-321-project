import json

class CoverLetterBuilder:

    jsonInfo = ""
    jsonInfoIndicators = ""

    def __init__(self, info, infoIndicators):
        self.jsonInfo = info
        self.jsonInfoIndicators = infoIndicators

    # param infile; file pointer with cover letter with indicators to be filled in with info
    # param outfile; file pointer where finished cover letter will be put
    def build(self, infile, outfile):
        pass
