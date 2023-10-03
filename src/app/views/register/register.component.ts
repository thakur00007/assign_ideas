import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AllResponse } from 'src/app/models/all-response';
import { LocalStorage } from 'src/app/helper/local-storage';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errMsg!: string

  constructor(private authService: AuthService, private router: Router){}


  localStorage: LocalStorage = new LocalStorage()
  ngOnInit(){
    if(this.localStorage.isValidToken()){
      this.router.navigate(['/home'])
    }else{
      this.localStorage.clearAll()
    }

  }


  user:User = new User()
  response: AllResponse = new AllResponse()

  register(model: any){
    if (model.valid) {
      if(this.user.pass === this.user.cnfPass){
        this.authService.register(this.user).subscribe(res => {
          this.response = res
          if(this.response.status === "success"){
            this.localStorage.set('user', JSON.stringify(this.response.data[0]))
            this.ngOnInit()
            this.authService.isLoggedIn.next(true)
          }else{
            this.errMsg = this.response.message;
          }
        },
        err => {
          this.errMsg = "Something Went Wrong! Please Try Again Later";
          this.closeAlert()
          this.authService.isLoggedIn.next(false)
        })
      }else{
        this.errMsg = "password and confirm password not match!"
        this.closeAlert()
      }
    }
  }

  closeAlert(){
    setTimeout(() => (this.errMsg = ''), 5000)
  }
}
