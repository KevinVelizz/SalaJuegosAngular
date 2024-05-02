import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../class/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _usuario!: BehaviorSubject<Usuario[]>;
  private usuarios: Usuario[] = [];
  constructor()
  {
    this._usuario = new BehaviorSubject<Usuario[]>([]);
  }

  public get usuario()
  {
    return this._usuario.asObservable();
  }

  addNewUsuario(user: Usuario)
  {
    this.usuarios.push(user);
    this._usuario.next(this.usuarios);
  }

  removeUsuario()
  {
    this.usuarios.splice(0);
  }
}
