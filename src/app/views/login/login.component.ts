import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/helper/local-storage';
import { AllResponse } from 'src/app/models/all-response';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService){}
  errMsg!: string
  localStorage: LocalStorage = new LocalStorage()
  user: User = new User()
  response: AllResponse = new AllResponse()
  ngOnInit(){
    if(this.localStorage.isValidToken()){
      this.router.navigate(['/home'])
    }else{
      this.localStorage.clearAll()
    }

  }

  login(model: NgForm){
    if (model.valid) {
      this.authService.login(this.user).subscribe(res => {
        console.log(res)
          this.response = res
          if(this.response.status === "success"){
            this.localStorage.set('user', JSON.stringify(this.response.data[0]))
            this.authService.isLoggedIn.next(true)
          }else{
            this.errMsg = this.response.message
            this.closeAlert()
            this.authService.isLoggedIn.next(false)
            model.reset()

          }
          this.ngOnInit()
      },
      err => {
        this.errMsg = "Something Went Wrong! Please Try Again Later"
        this.authService.isLoggedIn.next(false)
        this.closeAlert()
      }
      )
    }
  }


  closeAlert(){
    setTimeout(() => (this.errMsg = ''), 5000)
  }


}
