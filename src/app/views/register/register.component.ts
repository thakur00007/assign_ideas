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
          console.log(res)
          this.response = res
          // console.log(this.response.data[0].token);
          if(this.response.status === "success"){
              this.localStorage.set('user', JSON.stringify(this.response.data[0]))
            // this.localStorage.set('username', this.response.data[0].name)
            // this.localStorage.set('email', this.response.data[0].email)
            this.ngOnInit()
            this.authService.isLoggedIn.next(true)
          }else{
            this.errMsg = this.response.message;
          }
          
        },
        err => {
          this.errMsg = err.message;
          console.log(err)
          this.authService.isLoggedIn.next(false)
        })        
      }else{
        this.errMsg = "password and confirm password not match!"
      }
    }    
  }

  closeAlert(){
    this.errMsg = ''
  }
}
