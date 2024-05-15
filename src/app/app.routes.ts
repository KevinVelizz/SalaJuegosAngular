import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"login", loadComponent: () =>
        import('../app/components/login/login.component').then(
          (m) => m.LoginComponent
        ),},
    {path:"register", loadComponent: () =>
        import('../app/components/register/register.component').then(
            (m) => m.RegisterComponent
        ),},
    {path:"quienSoy", loadComponent: () =>
    import('../app/components/quien-soy/quien-soy.component').then(
        (m) => m.QuienSoyComponent
    ),},
    {path:"home", loadComponent: () =>
        import('../app/components/home/home.component').then(
            (m) => m.HomeComponent
    ),},
    {path:"chat", loadComponent: () =>
        import('../app/components/chat/chat.component').then(
            (m) => m.ChatComponent
    ),},
    {path:"juegos", loadChildren:()=> import('./components/juegos/juegos.routes'),
    },
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    
    //   {path:"**", loadComponent: () =>
        // import('../app/components/error/error.component').then(
        //   (m) => m.ErrorComponent
        // ),}
];
