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
            console.log(this.response.data[0].token);
            this.localStorage.set('user', JSON.stringify(this.response.data[0]))
            // this.localStorage.set('username', this.response.data[0].name)
            // this.localStorage.set('email', this.response.data[0].email)
            
            this.authService.isLoggedIn.next(true)
          }else{
            this.errMsg = this.response.message
            console.log(res.message);
            
            this.authService.isLoggedIn.next(false)
            model.reset()
            console.log(4554);
            
          }
          this.ngOnInit()
      },
      err => {
        console.log(err);
        this.errMsg = err.message;
        this.authService.isLoggedIn.next(false)
      }
      )
    }
  }
  

  closeAlert(){
    this.errMsg = ''
  }


}
