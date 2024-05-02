import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Usuario } from '../class/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private authF: AngularFireAuth) { }
  
  async registerFireBase(email:string, pass:string)
  {
    return await this.authF.createUserWithEmailAndPassword(email, pass);
  }

  async loginUserFireBase(email:string, pass:string)
  {
    return this.authF.signInWithEmailAndPassword(email, pass);
  }
  
  async signOut()
  {
    return await this.authF.signOut();
  }
}
