import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/helper/local-storage';
import { User } from 'src/app/models/user';
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router, private auth:AuthService){}
  localStorage: LocalStorage = new LocalStorage()
  // username: string = this.localStorage.get('name')
  user:User = new User()
  updatePass: UpdatePass = new UpdatePass()
  errMsg!:string
  msg!:string
  ngOnInit(){
    if(!this.localStorage.isValidToken()){
      this.router.navigate(['/login'])
      return
    }
    this.user.name = this.localStorage.get('name')
    this.user.email = this.localStorage.get('email')
  }

  changePass(formData: NgForm) {
    this.auth.updatePass(this.updatePass).subscribe(res => {
      this.closeAlert()
      if (res.status === "fail") {
        this.errMsg = res.message
        formData.resetForm()
      }
      if (res.status === "success"){
        this.msg = res.message
        formData.resetForm()
      }
      setTimeout(() => this.closeAlert(), 5000)
    })
  }

  closeAlert() {
    this.msg = ''
    this.errMsg = ''
  }
}

export class UpdatePass {
  oldPass!: string
  newPass!: string
  cnfPass!: string
}
