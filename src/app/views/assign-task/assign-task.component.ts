import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/helper/local-storage';
import { IdeasService } from 'src/app/services/ideas.service';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent {
  constructor(private router: Router, private ideaService: IdeasService){}
  localStorage: LocalStorage = new LocalStorage();
  uploaddata: uploadModel = new uploadModel()
  

  resMsg!: string
  alertColor!: string
  tagItems!: Array<string>

  ngOnInit(){
    if(!this.localStorage.isValidToken()){
      this.router.navigate(['/login'])
      return
    }

    this.ideaService.fetchTags().subscribe(res => {
      this.tagItems = res.data
    })
  }

  createUpload(formData: NgForm){
    if(formData.valid){
      if(this.areAllElementsIncluded(this.uploaddata.tags, this.tagItems)){
        console.log(this.uploaddata.tags);
        console.log(this.tagItems);
        
        
        this.ideaService.assignIdea(this.uploaddata).subscribe(res => {
          if (res.status === "fail") {
            this.alertColor = "danger"
            this.resMsg = res.message
            setTimeout(() => {
              this.resMsg = ""
            }, 5000);
          }else{
            this.alertColor = "success"
            this.resMsg = res.message
            setTimeout(() => {
              this.resMsg = ""
            }, 5000);
          }
          
        })
      }
    }else{
      this.alertColor = "warning"
      this.resMsg = "This Tag is Not Availible on Database"
    }
    // console.log(this.uploaddata);
    
  }

  onAddTag(tag: any){
    this.uploaddata.tags.push(tag.value)
    // console.log(this.uploaddata.tags);
    
    
  }
  onRemoveTag(tag: any){
    this.uploaddata.tags
    var index = this.uploaddata.tags.indexOf(tag.value);
    if (index !== -1) {
      this.uploaddata.tags.splice(index, 1);
    }
    // console.log(this.uploaddata.tags);
    
  }

  areAllElementsIncluded<T>(firstArr: T[], secondArr: T[]): boolean {
    // Convert the secondArr to a Set for faster lookup
    const secondSet = new Set(secondArr);
  
    // Check if all elements of firstArr are present in secondSet
    for (const element of firstArr) {
      if (!secondSet.has(element)) {
        return false;
      }
    }
  
    return true;
  }
  
}

export class uploadModel {
  title!: string
  description!: string
  tags: Array<string> = []
}

