import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { IUser } from '../interface/user';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users : IUser[] = [];
  user : IUser= new User;
  userExist : boolean = true;
  form = this.fb.group({
    "username": ["", Validators.required],
    "password": ["", Validators.required]
  });
  constructor(private router : Router, private userService : UserService, private fb: FormBuilder){

  }

  async ngOnInit(){
    const user = localStorage.getItem('User');
    console.log("User: ", user);
    if(user !== null){
      const loggedInUser:any = await this.userService.getUser(user);
      console.log("loggedInUser: ", loggedInUser );
      this.router.navigate(['/home',{username : loggedInUser.email , password: loggedInUser.password}]);
    }
  }  
  onSubmit() {
    console.log("form: ", this.form);
    const cUser = this.form.value
    console.log("cuser: ", cUser);
    this.userService.getUsers().pipe(
        map( (users: any) => {
          console.log("Users: ", users, cUser.username, cUser.password);
          return users.filter((user:IUser) =>  {
            console.log("U: ", user);
            return user.email === cUser.username && user.password === cUser.password} 
            )}
          ), 
    ).subscribe((user: IUser[] ) => {
      this.user = user[0]
      this.userService.user = this.user;
      console.log("user: ", this.user);
      if(this.user){
        localStorage.setItem('User', this.user.id);
        this.router.navigate(['/home',{username : this.user.email , password: this.user.password}]);
      }
      else{
        this.userExist = false;
      }
      
    })
    
  }

}
