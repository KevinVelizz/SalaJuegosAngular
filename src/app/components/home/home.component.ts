import { Component, OnInit, inject } from '@angular/core';
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
    
  routerHome = inject(Router);
  
  constructor(private AuthService:AuthService){}
  
  ngOnInit(): void 
  {
    this.AuthService.user$.subscribe(usuarioFire =>{
      if(!usuarioFire)
      {
        this.routerHome.navigate(['/login']);
      }
      console.log(usuarioFire);
    });
  }
}
