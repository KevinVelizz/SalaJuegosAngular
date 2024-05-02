import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../class/usuario';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

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
  toastScv = inject(ToastrService);

  constructor(private Auth:AuthService, private UsuarioService:UsuarioService)
  {}

  async register()
  {
    try
    {
      const user = await this.Auth.registerFireBase(this.correo, this.clave);
      if (user) {
        const usuario = new Usuario(this.correo, this.clave);
        this.UsuarioService.addNewUsuario(usuario);
        this.toastScv.success("Inicio de Sesión exitoso.", undefined, {
          timeOut:2000,
          positionClass: 'toast-bottom-center',
        })
        this.router2.navigate(['/home']);
      } else {
        console.log('Usuario no válido');
      }
    }catch(error)
    {
      this.toastScv.error("Error el usuario ya existe", undefined, {
        timeOut:2000,
        positionClass: 'toast-bottom-center',
      })
    }
  //   let usuariosGuardadosString:any = localStorage.getItem('usuarios');

  //   if (usuariosGuardadosString) 
  //   {
  //     usuariosGuardadosString = JSON.parse(usuariosGuardadosString);
  //   }
  //   else
  //   {
  //     usuariosGuardadosString = [];
  //   }
    
  //   if(this.correo != "" && this.clave!="")
  //   {
  //     let usuario = new Usuario(this.correo, this.clave);
  //     let usuarioExistente = usuariosGuardadosString.find((u: Usuario) => u.correo === usuario.correo);
        
  //     if (usuarioExistente) {
  //       this.validarUser = "El usuario ya existe";
  //     } else {
  //       usuariosGuardadosString.push(usuario);
  //       localStorage.setItem('usuarios', JSON.stringify(usuariosGuardadosString));
  //       this.router2.navigateByUrl('login');
  //     }
  //   }
  //   else
  //   {
  //     this.validarCorreo = "El correo es obligatorio";
  //     this.validarClave = "La clave es obligatorio";
  //   }
  }
}
