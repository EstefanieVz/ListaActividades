import { Component, OnInit } from '@angular/core';
import { Lista } from '../models/lista.model';
import { ListaService } from '../services/lista.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


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

}
