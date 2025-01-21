export class Actividad{
    titulo:string='';
    descripcion:string='';
    completado:boolean=false;

    constructor(titulo:string){
        this.titulo=titulo;
        this.descripcion='';
        this.completado=false;
    }

}