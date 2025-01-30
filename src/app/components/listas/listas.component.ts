import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
  standalone:false
})
export class ListasComponent  implements OnInit {

  constructor(public listaService: ListaService,public alert: AlertController,public toastController: ToastController,private router:Router) { }

  ngOnInit() {}

  borrarLista(item:Lista){
    this.listaService.borrarLista(item);
    console.log("Borrado ", item);
  }
  editarLista(item:Lista){
    this.editarLista2(item);
    console.log("Editar");
  }

  async editarLista2(listaEditar:Lista){

    let alert  = this.alert.create(
      {
        header: "Editar Lista",
        inputs:[{
          type:"text", name:"titulo",placeholder:"Ingresar el nombre de la lista"
        }],
        buttons:[{
          text:'Cancelar', role: 'cancelar',handler:(date:any)=>{
            console.log("Cancelado")
          }
        },{
          text:"Editar",
          handler:(data:any)=>{
            let valido:boolean = this.validarInput(data);
            if(valido){
              let titulo = data.titulo;
              listaEditar.titulo = titulo;
              this.listaService.editarLista(data.titulo);
              this.presentToast("Lista editada correctamente");
            }
            console.log(data);
          }
        }]}
    );
    (await alert).present();
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

  listaSeleccionada(listaItem:Lista)
  {
console.log(listaItem);
const URL = "/detalle/" + listaItem.id;
this.router.navigateByUrl(URL);
  }

}
