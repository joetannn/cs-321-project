import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  //test array
  skillsNotInResume = ['React', 'C#', 'Ruby', 'PHP', 'SQL', 'Go'];

  skills = [];
  skill = '';
  count = 0;
  skillsObj = {};
  duplicated = false;
  isEmpty = false;

  skill_arr = [''];

  //demo
  //if in prod, change this!!
  testUrl = 'http://localhost:8000/add?first_num=6&second_num=8';
  baseUrl = 'http://localhost:8000';
  sendUrl = '/send';

  coverLetter =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

  remove = '';

  user = new User('', '', '', '', {}, '');

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.user.skills = this.skillsObj;
    console.log(JSON.stringify(this.user)); // Here's the data in json
    console.log('Running math test');
    //if this fails, there is no connectivity
    this.showMath();
    //
    this.sendUserData();
  }

  addSkill() {
    //check for duplicates before adding here

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

    //did all this because arrays cannot be in json, has to be an object
    //skillsList{count: skill}

    this.skillsObj[this.count] = this.skill;
    this.skills.push(this.skillsObj[this.count]);
    this.count++;
    this.skill = '';
  }

  //add to the skills list here but make sure to remove if user double clicks the checkbox
  skillNotInResumeClicked(skill: String) {
    console.log(skill);
  }

  removeSkill(removeSkill: String) {
    this.skills.forEach(skill => {
      //console.log(skill);
      if (removeSkill == skill) {
        var index = this.skills.indexOf(skill);
        this.skills.splice(index, 1);

        //don't know how to remove an object from an array in typescript.. will fix this later
        this.skillsObj[index] = null;
      }
    });
  }

  get diagnostic() {
    return JSON.stringify(this.user);
  }

  //test methods that test connectivity
  getMath() {
    return this.http.get(this.testUrl);
  }

  showMath() {
    this.getMath().subscribe((data: any) => {
      console.log('SHOULD EQUAL 14: ' + JSON.stringify(data));
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
    console.log('PARAMS: ' + params.toString());
    return this.http.get(this.baseUrl + this.sendUrl + '?' + params.toString());
  }

  sendUserData() {
    this.getUserData().subscribe((data: any) => {
      console.log("RETURN DATA: " + JSON.stringify(data));
    });
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
