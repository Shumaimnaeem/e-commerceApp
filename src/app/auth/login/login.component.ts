import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/interface/user';
import { User } from '../../shared/models/user';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../AuthService/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  users : IUser[] = [];
  subscriptions: Subscription[] = [];
  user : IUser= new User;
  userExist : boolean = true;
  form = this.fb.group({
    "username": ["", Validators.required],
    "password": ["", Validators.required]
  });
  constructor(private router : Router, private userService : UserService, private fb: FormBuilder, private authService : AuthService){

  }

  async ngOnInit(){
    const user:IUser = await this.authService.getUserDetail();
    console.log("User: ", user);
    if(user){
      this.router.navigate(['/home']);
    }
  }  
  onSubmit() {
    console.log("form: ", this.form);
    const cUser = this.form.value
    console.log("cuser: ", cUser);
    this.subscriptions.push(
      this.userService.getUsers().pipe(
        map( (users: IUser[]) => {
          console.log("Users: ", users, cUser.username, cUser.password);
          return users.filter((user:IUser) =>  {
            console.log("U: ", user);
            return user.email === cUser.username && user.password === cUser.password} 
            )}
          ), 
    ).subscribe((user: IUser[] ) => {
      this.user = user[0]
      this.userService.user = this.user;
      console.log("user: ", user);
      if(this.user){
        localStorage.setItem('User', this.user.id);
        this.router.navigate(['/home']);
      }
      else{
        this.userExist = false;
      }
    })
    )
  }

  ngOnDestroy(){
    if(!!this.subscriptions){
      while(this.subscriptions.length > 0){
        this.subscriptions.pop();
      }
    }
  }

}
