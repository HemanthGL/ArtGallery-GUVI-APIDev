import { Unary } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { setupTestingRouter } from '@angular/router/testing';
import { IUserDet } from 'src/interfaces/IUserDet';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  isLogIn: boolean = false;

  userDetails: IUserDet | null = null;

  // user's index in Users Array in LocalStore
  userIdx: number = -1

  /**
   * 
   * @param userData Users Array with details
   * @description sets Users into the localstorage
   */
  setUsers(userData: Array<IUserDet>): void{
    localStorage.setItem('art-users', JSON.stringify(userData));
  }

  /**
   * @returns All User Details stored in LocalStorage
   */
  getUsers():Array<IUserDet>{
    let data: string | null = localStorage.getItem('art-users')

    let parsedData : Array<IUserDet>
    if (data == null){
      parsedData = []
      this.setUsers(parsedData);
    } else {
      parsedData = JSON.parse(data)
    }
    
    return parsedData;
  }

  /**
   * 
   * @param uName userName entered
   */
  findUserIndex(uName: string): number{
    let users: Array<IUserDet> = this.getUsers();
  
    let idx: number = users.findIndex((ele: IUserDet) => ele.userName == uName);

    return idx;
  }

  /**
   * 
   * @param uName userName to check
   * @returns boolean whether UserName already registered or not
   */
  checkUname(uName: string):boolean{
    let idx: number = this.findUserIndex(uName);
    if (idx == -1)
      return false;
    return true;
  }

  /**
   * 
   * @param uname username entered
   * @param pwd password entered
   * @description handles logIn Attempt
   */
  logInAttempt(uname: string, pwd: string): boolean{
    let checkName: boolean = this.checkUname(uname)

    if (!checkName){
      alert("Username doesn't exist!! Create New Account with username or check entered details...")
      return false
    } else {
      let idx: number = this.findUserIndex(uname)
      let users: Array<IUserDet> = this.getUsers()

      if (users[idx].password != pwd){
        alert('Incorrect Password, Please Try Again!!')
        return false;
      } else {
        this.isLogIn = true;
        this.userDetails = users[idx];
        this.userIdx = idx;

        return true;
      }

    }
  }

  createUser(uName: string, pwd: string): void {
    let userDet: IUserDet = {
      userName: uName,
      password: pwd,
      favourites: []
    }

    this.userDetails = userDet
    this.isLogIn = true

    this.reloadToStorage();
  }

  reloadToStorage(): void{
    if (this.isLogIn){
      let data: Array<IUserDet> = this.getUsers()
      let idx: number = this.findUserIndex(this.userDetails!.userName)

      if (idx != -1)
        data[idx] = this.userDetails!
      else{    
        data.push(this.userDetails!)
      }

      this.setUsers(data);
    } else {
      console.warn('user Not Logged In, trying to store to storage')
    }
  }

}
