import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  firstName = '';
  lastName = '';
  skills = [];
  resume = '';

  constructor() {}

  ngOnInit() {}

  createClicked() {
    name: this.firstName;
    console.log(this.firstName + ' pressed create');
  }
}
