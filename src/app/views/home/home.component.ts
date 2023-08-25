import { Component } from '@angular/core';
import { AllResponse } from 'src/app/models/all-response';
import { IdeasService } from 'src/app/services/ideas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  response: AllResponse = new AllResponse()
  
  constructor(private ideaService: IdeasService){}

  ngOnInit(){
    this.ideaService.fetchAllIdeas().subscribe(res => {
      this.response = res;
      // console.log(this.response.data);
      
    })
    
  }

}
