import { Injectable } from '@angular/core';
import { IUser } from 'src/app/shared/interface/user';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user : IUser = new User;
  constructor(private userService : UserService) {}
  isAuthenticated(){
    const userId = localStorage.getItem('User');
    if(userId != null){
      return true;
    }
    else{
      return false;
    }
  }
  async getUserDetail(){
    const userId = localStorage.getItem('User');
    console.log("UserId: ", userId);
    if(userId != null){
      const cu:any = await this.userService.getUser(+userId);
      this.user = cu;
    }
    return this.user;
  }
  async isUserSame(id:number){
    const userId = localStorage.getItem('User');
    if(userId){
      if(+userId === id)
        return true;
      else
        return false;  
    }
    else
        return false;
  }
}
