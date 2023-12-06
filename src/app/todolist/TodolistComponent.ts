import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray: { nom: string; email: string; isCompleted: boolean }[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllData().subscribe(
      (data: any[]) => {
        console.log('Server response:', data);
  
        if (Array.isArray(data) && data.length > 0) {
          this.taskArray = data.map((patient: { id: number; nom: string; email: string | null }) => ({
            id: patient.id,
            nom: patient.nom,
            email: patient.email || 'N/A', // Provide a default value if email is missing or null
            isCompleted: false
          }));
        } else {
          console.warn('Data is not an array or is empty:', data);
        }
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  

  onSubmit(form: NgForm) {
    console.log('Form data:', form.value);
  
    // Define the type of the form value explicitly
    const formData: { nom: string; email: string; isCompleted: boolean } = {
      nom: form.controls['nom'].value,
      email: form.controls['email'].value,
      isCompleted: false
    };
  
    this.taskArray.push(formData);
  
    // Call the backend service to save the data
    this.dataService.postData(formData).subscribe(
      response => {
        console.log('Server response after save:', response);
      },
      error => {
        console.error('Error saving data:', error);
      }
    );
  
    form.reset();
  }


  onDelete(index: number) {
    console.log(index);

    this.taskArray.splice(index, 1);
  }

  onCheck(index: number) {
    console.log(this.taskArray);

    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }
}
