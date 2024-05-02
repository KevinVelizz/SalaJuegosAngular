import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../class/usuario';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit {
    
  usuarios: Usuario[] = [];
  routerHome = inject(Router);
  
  constructor(private UsuarioService:UsuarioService){}
  
  ngOnInit(): void 
  {
    this.UsuarioService.usuario.subscribe(usuarios =>
    {
      this.usuarios = usuarios;
    });
    if(this.usuarios.length == 0)
    {
      this.routerHome.navigate(['/login']);
    }
  }
}
