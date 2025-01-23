import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  public listas: any []=[];
  constructor() { }
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
  borrarLista(){}
  editarLista(){}
  mostrarLista(){}
}
