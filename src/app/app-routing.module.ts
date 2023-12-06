// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './todolist/TodolistComponent';


const routes: Routes = [
  // Autres itinéraires...
  { path: 'patient', component: TodolistComponent  }
  
  // Autres itinéraires...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
