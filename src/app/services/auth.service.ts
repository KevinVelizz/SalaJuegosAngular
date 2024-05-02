import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app'; 
import { user } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$!: Observable<firebase.User | null>;
  constructor(private authF: AngularFireAuth) {
    this.user$ = this.authF.authState;
  }

  async registerFireBase(email:string, pass:string) {
    return await this.authF.createUserWithEmailAndPassword(email, pass);
  }

  async loginUserFireBase(email:string, pass:string){
    return this.authF.signInWithEmailAndPassword(email, pass);
  }

  async signOut()
  {
    return await this.authF.signOut();
  }

  setPersistenceLocal() {
    this.authF.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        console.log('Persistencia local configurada');
      })
      .catch((error) => {
        console.error('Error al configurar persistencia local:', error);
      });
  }
}
