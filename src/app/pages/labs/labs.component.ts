import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnDestroy, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent implements OnDestroy {
  //#region  Variables

  welcome='Hola mundo';
  myName=signal('Arbey');
  tasks=signal([
    'Instalar Angular',
    'Mi lista',
    'Crear componentes'
  ]);

  name="Johan";
  age=23;
  disable=true;
  img="https://img.freepik.com/foto-gratis/motor-rojo-bicicleta-carretera_114579-5071.jpg?size=626&ext=jpg";

  person=signal({
    nombre:"Johan",
    age:23,
    avatar:'https://png.pngtree.com/background/20230611/original/pngtree-an-avatar-of-a-man-with-a-beard-and-tie-picture-image_3171890.jpg'
  });
  colorCtrl= new FormControl();
  sub:Subscription|null=null;

//#endregion Variables

//#region  Constructor
  constructor(){
    this.handleFormSubcription();
  }
//#endregion Constructor

//#region Funciones
ngOnDestroy(): void {
  if(this.sub!=null){
    this.sub.unsubscribe();
  }
}
handleFormSubcription(){
  this.colorCtrl.valueChanges.subscribe(x=>{
    console.log(x);
  })
}

  clickHandler(){
    alert(JSON.stringify(this.person));
  }

  changeHandler(event:Event){
    console.log(event);
  }
  
  signalHandler(event:Event){
    const input=event.target as HTMLInputElement;
    const newValue=input.value;
    this.myName.set(newValue);
    console.log(this.myName());
  }

  downHandler(event:KeyboardEvent){
    const input=event.target as HTMLInputElement;
    console.log(input.value);
    
  }

  changeAge(event:Event){
    const input=event.target as HTMLInputElement;
    const newValue=input.value;
    this.person.update(prevState=>{
      return {
        ...prevState,
        age: parseInt(newValue,10)
      }
    }  
    );
  }
  changeName(event:Event){
    const input=event.target as HTMLInputElement;
    const newValue=input.value;
    this.person.update(prevState=>{
      return {
        ...prevState,
        nombre: newValue
      }
    }  
    );
  }
//#endregion Funciones
}
