import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  public listas: any []=[];
  constructor() { 
    this.cargarStorage();
  }
  crearLista(nombreLista: string){ //Método parametrizado
    let ObjLista = {
      id:0, 
      titulo:nombreLista, 
      creadaEn: new Date(),
      terminadaEn: null,
      completada: false,
      item:[]
    };
    this.listas.push(ObjLista);
    this.guardarStorage();
    return ObjLista.id;
  }
  guardarStorage(){
    let stringListas: string = JSON.stringify(this.listas);
    localStorage.setItem('listas',stringListas);
  }
  cargarStorage(){
    const listaStorage:any=localStorage.getItem('listas');
    if(listaStorage == null){
      return
    }
    let ObjLista = JSON.parse(listaStorage);
    this.listas=ObjLista;
  }
  editarLista(Lista: Lista){
    let MathLista = this.listas.filter((item:any)=>item.id===Lista.id);
    MathLista.titulo = Lista.titulo;
    this.guardarStorage();
  }
  borrarLista(Lista: Lista){
    let newListas = this.listas.filter((item:any)=>item.id !== Lista.id);
    this.listas=newListas;
    this.guardarStorage();
  }
  mostrarLista(){}
}
