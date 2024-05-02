import { Component, Input, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../../class/usuario';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { MessageService } from '../../services/message.service';
import { Message } from '../../interfaces/message';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';

// import { addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc } from
// '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule, MatSlideToggleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  correo:string = "";
  clave:string = "";
  router2 = inject(Router);
  toastScv = inject(ToastrService);
  // private firestore!: Firestore;
  validarUser:string = "";
  usuariosLogueados;
    
  constructor(private AuthService :AuthService, private UsuarioService : UsuarioService, private MessageService: MessageService, private NotificationService:NotificationService)
  {
    this.usuariosLogueados = [
      {email: 'kevinveliz@veliz.com', password: '123456'},
    ]
  }
  
  llenarCampos(numero:number)
  {
    try
    {
      this.correo = this.usuariosLogueados[numero].email;
      this.clave = this.usuariosLogueados[numero].password;
    }catch(error)
    {
      console.log(error);
    }
  }

  async singUp() {
    // const loading = await this.loadingCtrl.create();
    try {
      // await loading.present();
      const user = await this.AuthService.loginUserFireBase(this.correo, this.clave);
      if (user) {
        const usuario = new Usuario(this.correo, this.clave);
        // this.AuthService.setPersistenceLocal();
        // this.UsuarioService.addNewUsuario(usuario);
        const mensaje:Message =
        {
          usuario: {correo:`${usuario.correo}`, clave: `${usuario.clave}`},
          fechaIngreso: new Date()
        }
        // this.MessageService.agregarMensaje(mensaje)
        // .then(() => console.log('Mensaje agregado correctamente'))
        // .catch(error => console.error('Error al agregar el mensaje:', error));
        this.toastScv.success("Inicio de Sesión exitoso.", undefined, {
          timeOut:2000,
          positionClass: 'toast-bottom-center',
        });
        console.log("entró");
        this.router2.navigate(['/home']);
      }
    } catch (error) {
      console.log('Error al iniciar sesión:');
      this.toastScv.error("Verifique las credenciales.", undefined, {
        timeOut:2000,
        positionClass: 'toast-bottom-center',
      })
      // this.NotificationServiceService.showNotification('Error al iniciar sesión. Por favor, inténtalo de nuevo, por favor.');
      // loading.dismiss();
    }
  }
}
