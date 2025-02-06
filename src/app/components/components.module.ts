import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ListaService } from '../services/lista.service';
import { PipesModule } from '../pipes/pipe/pipes.module';



@NgModule({
  declarations: [ListasComponent],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    PipesModule
  ],
  exports:[ListasComponent]
})
export class ComponentsModule {
  constructor(public listaService:ListaService){
    
  }
 }
