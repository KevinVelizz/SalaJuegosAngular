import { Component, Input, inject, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from './services/usuario.service';
import { Usuario } from './class/usuario';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TPLab4';
  logueado:boolean = false;
  usuarios!:Usuario[];
  routerNav = inject(Router);

  constructor(private UsuarioService : UsuarioService, private AuthService :AuthService)
  {
    this.usuarios = [];
  }
  ngOnInit(): void {
    this.UsuarioService.usuario.subscribe(usuarios=>{
      this.usuarios = usuarios;

      if(this.usuarios.length == 0)
      {
        console.log("vacio");
      }
      else
      {
        console.log("logueado");
        this.logueado = true;
        console.log(this.usuarios[0]);
      }
      
    });
  }

  async LogOut()
  {
    try {
      await this.AuthService.signOut();
      this.UsuarioService.removeUsuario();
      this.logueado = false;
      this.routerNav.navigate(['/login']);
      console.log(this.usuarios);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
