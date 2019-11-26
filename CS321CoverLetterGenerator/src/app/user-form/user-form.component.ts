import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { HttpClient } from '@angular/common/http';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],

  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  //test array

  skills = [];
  skill = '';
  count = 0;
  skillsObj = {};
  duplicated = false;
  isEmpty = false;

  skill_arr = [''];

  //returned values
  skillsInBoth = [];
  skillsNotInResume = [];
  skillsInResume = [];

  displaySkillsInResume = false;
  displaySkillsNotInResume = false;

  sj = '';
  snj = '';
  nsj = '';

  //demo
  //if in prod, change this!!
  testUrl = 'http://localhost:8000/add?first_num=6&second_num=8';
  baseUrl = 'http://localhost:8000';
  sendUrl = '/send';

  coverLetter =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

  remove = '';

  user = new User('', '', '', '', {}, '');


  constructor(private http: HttpClient) {

  }

  ngOnInit() {}

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.user.skills = this.skillsObj;
    console.log(JSON.stringify(this.user)); // Here's the data in json
    console.log('Running math connection test....');
    //if this fails, there is no connectivity
    this.showMath();
    //
    if (this.validURL()) {
      this.sendUserData();
    } else {
      console.log('Incorrect link');
    }
  }

  validURL() {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(this.user.link);
  }

  addSkill() {
    //removes the warning
    this.duplicated = false;
    this.isEmpty = false;

    if (this.skill == '') {
      this.isEmpty = true;
      return;
    }

    if (this.skills.includes(this.skill)) {
      //sends the warning, and will not add that skill
      this.duplicated = true;
      return;
    }

    this.skillsObj[this.count] = this.skill;
    this.skills.push(this.skillsObj[this.count]);
    this.count++;
    this.skill = '';
  }

  skillClicked(skill: String) {
    if (this.skills.includes(skill)) {
      var index = this.skills.indexOf(skill);
      if (index !== -1) {
        this.skills.splice(index, 1);
      }
    } else {
      this.skills.push(skill);
    }
    this.printAllSkills();
  }

  printAllSkills() {
    console.log('-------- Final skills list -----------');
    this.skills.forEach(skill => {
      console.log(skill);
    });
    console.log('------------------------------------');
  }

  removeSkill(removeSkill: String) {
    var index = this.skills.indexOf(removeSkill);
    if (index !== -1) {
      this.skills.splice(index, 1);
    }

    //this.skills.forEach(skill => {
    //console.log(skill);
    // if (removeSkill == skill) {
    //   var index = this.skills.indexOf(skill);
    //   this.skills.splice(index, 1);

    //   //don't know how to remove an object from an array in typescript.. will fix this later
    //   this.skillsObj[index] = null;
  }

  //test methods that test connectivity
  getMath() {
    return this.http.get(this.testUrl);
  }

  showMath() {
    this.getMath().subscribe((data: any) => {
      console.log('Connection Test: ' + JSON.stringify(data));
    });
  }

  getUserData() {
    let params = new URLSearchParams();
    for (let key in this.user) {
      params.set(key, this.user[key]);
    }

    for (let skill in this.skills) {
      this.skill_arr.push(this.skills[skill]);
    }

    params.set('skills', btoa(this.skill_arr.join('|')));
    console.log('SENDING PARAMS: ' + params.toString());
    return this.http.get(this.baseUrl + this.sendUrl + '?' + params.toString());
  }

  sendUserData() {
    this.getUserData().subscribe((data: any) => {
      console.log('RETURN DATA: ' + JSON.stringify(data));
      this.sj = data['1'];
      this.nsj = data['2'];
      this.snj = data['3'];
      //console.log("STRING DATA: " + this.sj + "||" + this.nsj + "||" + this.snj);
      if (this.sj != '') {
        this.skillsInBoth = this.sj.split('|');
      }
      if (this.nsj != '') {
        this.skillsNotInResume = this.nsj.split('|');
      }
      if (this.snj != '') {
        this.skillsInResume = this.snj.split('|');
      }
      //this.cdRef.markForCheck();
      //console.log("FORMATTED RETURN LIST: " + this.in_skills_in_job.toString() + this.not_in_skills_in_job.toString() + this.not_in_job_in_skills.toString());
    });
  }

  insertKeywords()
  {
    var seeds = ['I am proficient in ', 'I am also highly skilled in ', 'One of my passions are '];


    console.log("Inserting Keywords");
    this.coverLetter = "";
    this.coverLetter += this.user.firstName + " " + this.user.lastName;
    this.newline();
    this.coverLetter += formatDate(new Date(), 'dd/MM/yyyy', 'en');
    //this.coverLetter += this.user.position;
    this.newline();
    this.newline();
    this.coverLetter += "To whom It May Concern,";
    this.newline();
    this.coverLetter += "I am applying for the position of " + this.user.position + " at your company. I located the job posting on your website and found that I fit the posted qualifications.";
    this.newline();
    /*if (this.skills.length > 3)
    {
      this.coverLetter += "Some of my skills applicable to the job include " + this.skills[0] + ", " + this.skills[1] + ", and " + this.skills[2] + ". ";
      var i: number;
      for (i = 3; i < 6; i++)
      {
        if (this.skills[i] == "undefined") continue;
         this.coverLetter += seeds[i - 3] + this.skills[i] + ". ";
      }
      if (i < this.skills.length) this.coverLetter += "More of my skills include ";
      for(i = 6; i < this.skills.length; i++)
      {
        if (i + 1 == this.skills.length)
        {
          this.coverLetter += " and " + this.skills[i] + ". ";
        }
        else
        {
          this.coverLetter += this.skills[i] + ", ";
        }

      }
    }
    else
    {
        var i: number;
        for (i = 0; i < this.skills.length; i++)
        {
          this.coverLetter+= seeds[i] + this.skills[i] + '.';
        }

    } */
    if (this.skills.length > 0)
    {
      this.coverLetter += "Some of my skills include ";
    }

    for (var i = 0; i < this.skills.length; i++)
    {
      if (i + 1 == this.skills.length)
      {
          this.coverLetter += this.skills[i] + ".";
      }
      else
      {
        this.coverLetter += this.skills[i] + ", ";
      }

    }

    this.newline();
    this.coverLetter += "Looking forward to hearing back from you soon. Please contact me if you have any additional questions or concerns.";
    this.newline();
    this.newline();
    this.coverLetter += this.user.firstName + " " + this.user.lastName;



  }

  newline()
  {
    this.coverLetter += '\n'
  }

  copyToClipboard(item)
  {
    document.addEventListener('copy', (e: ClipboardEvent) => {
        e.clipboardData.setData('text/plain', (item));
        e.preventDefault();
        document.removeEventListener('copy', null);
      });
      document.execCommand('copy');
  }
}



//******************************  Cover Letter Template  **************************************

// [Current Date]

// [To Whom It May Concern / Recruiter or Company Name],
// I am applying for the position of [Insert Position Desired] for [Insert Company Name] as seen on your website.
// Over the course of my college career, I have created [insert class project] [within a group], [insert class project] and have studied [insert class/topic].
// I am familiar with [skill 1], [skill 2]. [skill 3]
// [Certifications if applicable and expected graduation date with degree and school name.]
// I am confident that I can offer [requirement 1], [requirement 2], and [requirement 3].  I have attached my resume for more details.  Feel free to call me at [phone number] or email me at [email address] to arrange an interview.  Thank you for your time – I look forward to hearing from you.
// Sincerely,

// [Insert Name]
