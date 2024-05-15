import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../class/usuario';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit {
    
  routerHome = inject(Router);
  usuario!:Usuario;
  constructor(private AuthService:AuthService){}
  
  ngOnInit(): void 
  {
    this.AuthService.user$.subscribe(usuarioFire =>{
      if(!usuarioFire)
      {
        this.routerHome.navigate(['/login']);
      }
    });
  }
}
