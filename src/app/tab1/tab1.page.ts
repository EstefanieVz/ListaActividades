import { Component } from '@angular/core';
import { AlertController,ToastController } from '@ionic/angular';
import { ListaService } from '../services/lista.service';
import { Lista } from '../models/lista.model';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(public alert: AlertController, 
    public toastController: ToastController,
    public listaService:ListaService,
    private router:Router
  ) {}
  async AgregarListaAct(){
    let alert  = this.alert.create(
      {
        header: "Agregar Lista",
        inputs:[{
          type:"text", name:"titulo",placeholder:"Ingresar el nombre de la lista"
        }],
        buttons:[{
          text:'Cancelar', role: 'cancelar',handler:(date:any)=>{
            console.log("Cancelado")
          }
        },{
          text:"Crear",
          handler:(data:any)=>{
            let valido:boolean = this.validarInput(data);
            if(valido){
              let wasCreated = this.listaService.crearLista(data.titulo);
              this.presentToast("La lista se creo correctamente");
            }
            console.log(data);
          }
        }]}
    );(await alert).present();
  }
  validarInput(input:any){
    if(input && input.titulo){ return true;}
    this.presentToast("Debe de ingresar un valor");
    console.log(" Debe de ingresar un Valor ");
    return false;
  }

  async presentToast(mensaje: string){
    let toast= await this.toastController.create({
      message:mensaje,
      duration:2000
    });
    toast.present();
  }

  listaSeleccionada(listaItem:Lista){
    console.log(listaItem);
    const URL="/detalle"+ listaItem.id;
    this.router.navigateByUrl(URL);
  }

}
