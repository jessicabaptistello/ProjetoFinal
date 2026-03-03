import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Aqui ligamos ao ficheiro de cima

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};