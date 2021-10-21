import { Component, OnInit } from '@angular/core';
import { FormControl , ReactiveFormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/interface/user';
import { User } from '../../shared/models/user';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),

  });
  roles:any []= ['','Admin', 'Normal User'];
  user : IUser = new User;
  constructor(private userService : UserService, private router : Router) {}

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("Sign Up Creds: ", this.signUpForm.value);
    this.userService.addUser(this.signUpForm.value)
    this.router.navigate(['./login'])
  }
}
