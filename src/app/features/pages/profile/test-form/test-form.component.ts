import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';


export interface Course {
  id:string;
  titles: {
      description:string;
      longDescription: string;
  };
  iconUrl: string;
  price:number;
  uploadedImageUrl:string;
  courseListIcon: string;
  categories:string[];
  lessonsCount:number;
}


@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {

  form: FormGroup;
  description:string;

  course: Course;

  uploadPercent$ : Observable<number>;


  constructor(
      private fb: FormBuilder,
     
    
      //private coursesService: CoursesService,
      private storage: AngularFireStorage) {

   

      const titles = ""

      this.form = fb.group({
          description:  "TEST",
          longDescription: "ANOther Test",
          first_name: ""
      });

  }

  uploadFile(event) {

  

  }

  ngOnInit() {

  }


  save() {

      const changes = this.form.value;

  }

  close() {
     
  }


}
