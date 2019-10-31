import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  skills = [];
  skill = '';
  count = 0;
  skillsObj = {};
  duplicated = false;
  isEmpty = false;

  //demo
  //if in prod, change this!!
  configUrl = 'http://localhost:8000/add?first_num=6&second_num=8'

  coverLetter =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

  remove = '';

  user = new User('', '', '', '', {}, '');

  constructor(private http: HttpClient) {

  }

  ngOnInit() {

  }

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.user.skills = this.skillsObj;
    console.log(JSON.stringify(this.user)); // Here's the data in json
    this.showMath();


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

  removeSkill(removeSkill: String) {
    this.skills.forEach(skill => {
      //console.log(skill);
      if (removeSkill == skill) {
        var index = this.skills.indexOf(skill);
        this.skills.splice(index, 1);

        //don't know how to remove an object from an array in typescrip.. will fix this later
        this.skillsObj[index] = null;
      }
    });
  }

  get diagnostic() {
    return JSON.stringify(this.user);
  }

  getMath()
  {
    return this.http.get(this.configUrl);
  }

  showMath()
  {
    this.getMath().subscribe((data: any) =>
    {
      console.log(JSON.stringify(data));
    });
  }
}
