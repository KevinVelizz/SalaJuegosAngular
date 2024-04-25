export class Usuario {
    correo:string = "";
    clave:string = "";
    
    public constructor(correo:string, clave:string)
    {
        this.correo = correo;
        this.clave = clave;
    }
}
