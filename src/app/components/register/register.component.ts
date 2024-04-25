import { Component, inject } from '@angular/core';
import { Usuario } from '../../class/usuario';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  correo:string = "";
  clave:string = "";
  public validarCorreo:string = "";
  public validarClave:string = "";
  router2 = inject(Router);
  public validarUser :string = "";

  register()
  {
    let usuariosGuardadosString:any = localStorage.getItem('usuarios');

    if (usuariosGuardadosString) 
    {
      usuariosGuardadosString = JSON.parse(usuariosGuardadosString);
    }
    else
    {
      usuariosGuardadosString = [];
    }
    
    if(this.correo != "" && this.clave!="")
    {
      let usuario = new Usuario(this.correo, this.clave);
      let usuarioExistente = usuariosGuardadosString.find((u: Usuario) => u.correo === usuario.correo);
        
      if (usuarioExistente) {
        this.validarUser = "El usuario ya existe";
      } else {
        usuariosGuardadosString.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuariosGuardadosString));
        this.router2.navigateByUrl('login');
      }
    }
    else
    {
      this.validarCorreo = "El correo es obligatorio";
      this.validarClave = "La clave es obligatorio";
    }
  }
}
