import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroLista',
  standalone: false,
  pure:false   //sirve para checar en tiempo real todas las actividad de lista cuando se vayan modificando
})
export class FiltroListaPipe implements PipeTransform {

  transform(listas:Lista[], tipo:string): any {
    let lista : any =[];

    switch(tipo){
      case 'por hacer':
        lista = listas.filter((itemLista)=>itemLista.completada=== false && 
        itemLista.item.filter((itemActividad)=>itemActividad.completado==true).length==0);
        break;
    

      case 'haciendo':
        lista = listas.filter((itemLista)=>itemLista.completada=== false && 
        itemLista.item.filter((itemActividad)=>itemActividad.completado==true).length>0);
      break;

      case 'terminado':
        lista = listas.filter((itemLista)=>itemLista.completada===true);
        break;

        default:
          break;
  }
  return lista;
  }
}
