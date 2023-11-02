import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService){}

  /**
   * 
   * @returns Validator Function for Registration form
   * @description Custom Validator Fn for Validating password, confirm password form controls
   */
  passwordConfirm(): ValidatorFn {
    return (ctrl: AbstractControl): ValidationErrors | null => {
      let pwd = ctrl.get('password');
      let confirmPwd = ctrl.get('confirmPwd')

      return pwd && confirmPwd && pwd.value !== confirmPwd.value ? { confirm: true } : null;
    }
  }

  registerF!: FormGroup;

  ngOnInit(){
    
    this.registerF = this.fb.group({
      userName: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10)]],
      password: ['', 
      [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirmPwd: ['', [
        Validators.required,
      ]], 
    }, {
      validators: this.passwordConfirm()
    })

  }

  /**
   * 
   * @param event Mouse click event on Submit button
   * @description redirects to users page on succesfuly submission of Form
   */
  onSubmit(event: MouseEvent){
    // this.router.navigate(['/users'])
    // if (this.auth.checkUname())
    
    let uName: string = this.registerF.get('userName')!.value;
    let pwd: string = this.registerF.get('password')!.value;

    if (this.auth.checkUname(uName)){
      alert('Username already exists!! Try another Username or Login with associated Username')
    } else {
      this.auth.createUser(uName, pwd)
      alert('User Account Created')
      this.router.navigate(['/'])
    }
  }

}
