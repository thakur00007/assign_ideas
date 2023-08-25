import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/helper/local-storage';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router){}
  localStorage: LocalStorage = new LocalStorage()
  // username: string = this.localStorage.get('name')
  user:User = new User()
  
  ngOnInit(){
    if(!this.localStorage.isValidToken()){
      this.router.navigate(['/login'])
      return
    }
    this.user.name = this.localStorage.get('name')
    this.user.email = this.localStorage.get('email')
  }
}
