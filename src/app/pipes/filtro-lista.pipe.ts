import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroLista',
  standalone: true
})
export class FiltroListaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
