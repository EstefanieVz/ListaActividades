import { Actividad } from './actividad.model';
export class Lista{
    id: number = new Date().getTime();
    titulo: string='';
    descripcion:string='';
    creadaEn: Date= new Date();//fecha en automatico
    terminadaEn: Date | null=null;
    completada: boolean=false;
    item: Actividad[];

    constructor(titulo:string){
        this.titulo=titulo;
        this.creadaEn=new Date();
        this.completada=false;
        this.item=[];
        this.id=new Date().getTime();
    }
}