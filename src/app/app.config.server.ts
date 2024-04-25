import { mergeApplicationConfig, ApplicationConfig, forwardRef } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
