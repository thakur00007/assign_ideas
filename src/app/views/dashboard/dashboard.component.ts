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
      alert(res.message)
      if (res.status === "success"){
        formData.resetForm()
      }
    })
  }
}

export class UpdatePass {
  oldPass!: string
  newPass!: string
  cnfPass!: string
}
