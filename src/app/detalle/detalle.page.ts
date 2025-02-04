import { Component, OnInit } from '@angular/core';
import { Lista } from '../models/lista.model';
import { ListaService } from '../services/lista.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Actividad } from '../models/actividad.model';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: false,
})
export class DetallePage implements OnInit {

lista:Lista;
idLista:any='';
nombreItem:string='';

  constructor(
    public listaServices: ListaService,
    private router:ActivatedRoute,
    private toastController:ToastController,
    private alerta: AlertController
  ) {
    this.idLista = this.router.snapshot.paramMap.get("idLista");
    this.lista = this.listaServices.mostrarLista(this.idLista);
   }

  ngOnInit() {
  }
  agregar(){
    if(this.nombreItem.length==0){
      return;
    }
    const actividad = new Actividad(this.nombreItem);
    this.lista.item.push(actividad);
    this.listaServices.guardarStorage();
    this.nombreItem='';
    console.log(this.nombreItem);
  }

  editar(lista:Lista, actividad:Actividad){
    this.EditarAct(actividad);
  }

  async EditarAct(actividad:Actividad){
    let alert=this.alerta.create({
      header:"  Editar Actividad",
      inputs:[{
        type:"text",
        name:"nActividad",
        placeholder:"Ingresa el nombre de la actividad"
      }],
      buttons:[{
        text:"Cancelar",
        role:"cancel",
        handler:(data:any)=>{
          console.log("Cancelar")
        }
      },{
        text:'Editar',
        handler:(data:any)=>{
          let valido:boolean=this.validarInput(data);
          if(valido){
            let descripcion = data.nActividad;
            actividad.titulo=descripcion;
            actividad.descripcion=descripcion;
            this.listaServices.guardarStorage();
          }
        }
      }]
    });
    (await alert).present();
  }

  cambioCheck(actividad:Actividad){
    const pendientes=this.lista.item.filter(item=>item.completado=false).length;
    if(pendientes ==0){
      //verificamos que la lista está completada
      this.lista.completada= true;
      this.lista.terminadaEn= new Date();
    }
    else{
      this.lista.completada=false;
      this.lista.terminadaEn=null;
    }
  }

  borrar(act:Actividad){
    this.lista.item = this.lista.item.filter(item=> item !==act);
    this.listaServices.guardarStorage();
  }
  validarInput(input:any){
    if(input && input.nActividad){ return true;}
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

}
