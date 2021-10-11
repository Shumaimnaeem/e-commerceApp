import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { IUser } from '../interface/user';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser = new User;
  
  constructor(private http: HttpClient) { }
  async addUser(u: IUser){
    console.log("User service: ", u);
    return await this.http.post('https://61556a8093e3550017b089b8.mockapi.io/user', u).toPromise();
  }
  getUsers(){
    return this.http.get('https://61556a8093e3550017b089b8.mockapi.io/user');
  }
  async getUser(id:any){
    const url = `https://61556a8093e3550017b089b8.mockapi.io/user/${id}`;
    return await this.http.get(url).toPromise();
  }
}
