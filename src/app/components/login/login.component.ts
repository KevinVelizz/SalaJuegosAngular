import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { QuienSoyComponent } from '../quien-soy/quien-soy.component';
// import { addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc } from
// '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, QuienSoyComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  correo:string = "";
  clave:string = "";
  router2 = inject(Router);
  // private firestore!: Firestore;
  validarUser:string = "";

  login()
  {
    
  }
}
