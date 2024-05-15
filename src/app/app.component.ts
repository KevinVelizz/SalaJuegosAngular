import { Component, Input, inject, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Usuario } from './class/usuario';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TPLab4';
  logueado:boolean = false;
  routerNav = inject(Router);
  correo:string | null = "";
  constructor(private AuthService :AuthService)
  {
  }
  ngOnInit(): void {
    this.AuthService.user$.subscribe(usuarioFire =>{
      if(usuarioFire)
      {
        this.logueado = true;
        this.correo = usuarioFire.email;
      }
    });
  }

  async LogOut()
  {
    try {
      await this.AuthService.signOut();
      this.logueado = false;
      this.routerNav.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
