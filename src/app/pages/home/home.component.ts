import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {Task} from './../../models/task.models';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NonNullAssert } from '@angular/compiler';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  tasks=signal<Task[]>([
    {
      id:Date.now(),
      title: 'Crear proyecto',
      completed:false
    },
    {
      id:Date.now(),
      title: 'Crear componentes',
      completed:false
    },
    {
      id:Date.now(),
      title: 'Crear modelos',
      completed:false
    }
  ]);

  newsTaskControl=new FormControl('',{
    nonNullable:true,
    validators:[
      Validators.required
    ]
  });
  changeHandler(event:Event){
    const input=event.target as HTMLInputElement;
    const newTask =input.value;
    this.addTask(newTask);
  }

  addTask(title:string){
    const newTask={
      id: Date.now(),
      title: title,
      completed: false
    };
    this.tasks.update((tasks)=>[...tasks,newTask]);
  }
  deleteTask(index:number){
    this.tasks.update((tasks)=>tasks.filter((tasks,position)=>position!==index));
  }

  updateTask(index:number){
    this.tasks.update((tasks) => {
      return tasks.map((task,position)=>{
        if(position===index){
          return {
            ...task,
            completed:!task.completed
          }         
        }
        return task;
      })
    })
  }
}
