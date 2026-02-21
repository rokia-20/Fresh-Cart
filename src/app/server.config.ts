import { provideServerRendering } from '@angular/platform-server';
import { provideClientHydration } from '@angular/platform-browser';

// This configuration tells Angular which routes should be rendered on the server
export const serverConfig = {
  providers: [
    provideClientHydration(),
    provideServerRendering(),
    {
      provide: 'ROUTES_TO_PRERENDER',
      useValue: [
        '/',
        '/home',
        '/products',
        '/brands',
        '/categories',
        '/wishlist',
        '/cart',
        '/allorders',
        '/profile'
      ]
    }
  ]
};
