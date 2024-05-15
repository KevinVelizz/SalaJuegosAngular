import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment.development';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),importProvidersFrom(HttpClient), provideHttpClient(), provideClientHydration(), importProvidersFrom(AngularFireModule.initializeApp(environment.firebaseConfig)), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideStorage(() => getStorage())), provideAnimations(),
  provideToastr()],
};
