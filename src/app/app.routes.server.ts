import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static routes that should be prerendered
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'products', renderMode: RenderMode.Prerender },
  { path: 'brands', renderMode: RenderMode.Prerender },
  { path: 'categories', renderMode: RenderMode.Prerender },
  { path: 'wishlist', renderMode: RenderMode.Prerender },
  { path: 'cart', renderMode: RenderMode.Prerender },
  { path: 'allorders', renderMode: RenderMode.Prerender },
  { path: 'profile', renderMode: RenderMode.Prerender },
  { path: 'reset', renderMode: RenderMode.Prerender },
  
  // Dynamic routes - explicitly set to client-side rendering
  { path: 'subcategories/:id', renderMode: RenderMode.Client },
  { path: 'details/:id', renderMode: RenderMode.Client },
  { path: 'checkout/:id', renderMode: RenderMode.Client },
  
  // Catch-all for 404 - keep as prerender
  { path: '**', renderMode: RenderMode.Prerender }
];
