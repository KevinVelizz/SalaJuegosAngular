import { Routes } from '@angular/router';
export const routes: Routes = [
  {path:"ahorcado", loadComponent: () =>
    import('../juegos/ahorcado/ahorcado.component').then(
      (m) => m.AhorcadoComponent
    ),  
  },
  {path:"mayorMenor", loadComponent: () =>
    import('../juegos/mayor-menor/mayor-menor.component').then(
      (m) => m.MayorMenorComponent
    ),
  },
  {path:"preguntados", loadComponent: () =>
    import('../juegos/preguntados/preguntados.component').then(
      (m) => m.PreguntadosComponent
    ),
  },
  {path:"blackJack", loadComponent: () =>
    import('../juegos/black-jack/black-jack.component').then(
      (m) => m.BlackJackComponent
    ),
  },
]
export default routes;