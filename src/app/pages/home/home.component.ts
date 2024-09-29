import { CommonModule } from '@angular/common';
import { Component, computed,effect, inject, Injector, signal } from '@angular/core';
import {Task} from './../../models/task.models';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  tasks=signal<Task[]>([]);

  newsTaskControl=new FormControl('',{
    nonNullable:true,
    validators:[
      Validators.required
    ]
  });

  filter=signal<'all'|'pending'|'completed'>('all');

  taskByFilter=computed(()=>{
    const filter=this.filter();
    const task=this.tasks();
    if(filter==='pending'){
      return task.filter(t=>!t.completed);
    }
    if(filter==='completed'){
      return task.filter(t=>t.completed);
    }
    return task;
  });

  constructor(){
    
  }

  injector=inject(Injector);

  ngOnInit(){
    const storage=localStorage.getItem('tasks');
    if(storage){
      const task=JSON.parse(storage);
      this.tasks.set(task);
    }
    this.trackTasks();
  }

  trackTasks(){
    effect(()=>{
      const tasks=this.tasks();
      localStorage.setItem('tasks',JSON.stringify(tasks));
      console.log(tasks);
    },{injector:this.injector});
  }

  changeHandler(){
    if(this.newsTaskControl.valid){
      const value=this.newsTaskControl.value.trim();
      if(value !==''){
        this.addTask(value);
        this.newsTaskControl.setValue('');
      }
    } 
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

  updateTaskEditingMode(index:number){
    this.tasks.update((tasks) => {
      return tasks.map((task,position)=>{
        if(position===index){
          return {
            ...task,
            editing:true
          }         
        }
        return {
          ...task,
          editing:false
        };
      })
    })
  }

  updateTaskText(index:number,event:Event){
    const input= event.target as HTMLInputElement;
    this.tasks.update((tasks) => {
      return tasks.map((task,position)=>{
        if(position===index){
          return {
            ...task,
            title:input.value,
            editing:false
          }         
        }
        return task;
      })
    });
  }

  changeFilter(filter:'all'|'pending'|'completed'){
    this.filter.set(filter);
  }

}
