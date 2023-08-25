import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorage } from 'src/app/helper/local-storage';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router, private auth: AuthService){
    
    // this.showUser()
    // this.auth.isLoggedIn.next(this.localstorage.isValidToken())
    // console.log(789456456);

    this.subscription = this.auth.isLoggedIn.subscribe((isLoggedin) => {
      this.isLoggedIn = isLoggedin
      
      this.username = this.localstorage.get('name')
    })
    this.auth.isLoggedIn.next(this.localstorage.isValidToken())
    
  }
  route: Router = this.router
  localstorage: LocalStorage = new LocalStorage()

  username!: string
  isLoggedIn = false
  private subscription!: Subscription;

  ngOnInit(){
    // this.auth.isLoggedIn.next(this.localstorage.isValidToken())
    
  }

  // showUser(){
  //   this.subscription = this.auth.isLoggedIn.subscribe((isLoggedin) => {
  //     this.isLoggedIn = isLoggedin
      
  //     this.username = this.localstorage.get('name')
  //   })
  // }

  logout(){
    localStorage.clear()
    this.auth.isLoggedIn.next(false)
    // this.isLoggedIn = false
    // this.subscription.unsubscribe()
    this.router.navigate(['/login'])
  }
}
