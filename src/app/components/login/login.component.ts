import { Unary } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthService,private router: Router, private fb: FormBuilder){}

  fg! : FormGroup

  ngOnInit(){
    this.fg = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    })
  }

  /**
   * 
   * @param event Mouse click event on Submit button
   * @description redirects to users page on succesfuly submission of Form
   */
  onSubmit(event: MouseEvent){
    
    if (this.auth.isLogIn){
      alert('Already logged In..')
    } else {

      let uName: string = this.fg.get('userName')!.value
      let pwd: string = this.fg.get('password')!.value

      if (this.auth.logInAttempt(uName, pwd)){
        this.router.navigate(['/'])
      }
    }

    // this.router.navigate(['/users'])
  }


}
