import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './Core/auth/login/login.component';
import { RegisterComponent } from './Core/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { CartComponent } from './features/cart/cart.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './Core/guards/auth-guard';
import { isLoggedGuard } from './Core/guards/is-logged-guard';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { AllordersComponent } from './features/allorders/allorders.component';
import { ForgetpasswordComponent } from './Core/auth/forgetpassword/forgetpassword.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';
// No need for SSR-specific imports for this approach

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '' , component: AuthLayoutComponent,canActivate:[isLoggedGuard] , children: [
        {path: 'login', component: LoginComponent , title: 'Login page'},
        {path: 'register', component: RegisterComponent , title: 'Register page'},
        {path: 'forgetpassword', component: ForgetpasswordComponent , title: 'Forget Password page'}
    ]},
    {path: '' , component: BlankLayoutComponent,canActivate:[authGuard] , children: [
        {path:'home',component:HomeComponent, title: 'Home page'},
        {path:'products', component:ProductsComponent, title: 'products page'},
        {path:'brands', component:BrandsComponent, title: 'brands page'},
        {
          path: 'brand/:id',
          title: 'Brand Products',
          loadComponent: () =>
            import('./features/brand-details/brand-details.component')
              .then((c) => c.BrandDetailsComponent),
          data: { skipPrerender: true }
        },
        {path:'categories', component:CategoriesComponent, title: 'categories page'},
          // Dynamic routes that should not be prerendered
          {
            path: 'subcategories/:id',
            title: 'subcategories page',
            loadComponent: () =>
              import('./features/categories/components/sub-categories/sub-categories.component')
                .then((c) => c.SubCategoriesComponent),
            // This tells Angular to handle this route on the client side only
            data: { skipPrerender: true }
          },
          {
            path: 'category/:id',
            title: 'Category Products',
            loadComponent: () =>
              import('./features/category-details/category-details.component')
                .then((c) => c.CategoryDetailsComponent),
            data: { skipPrerender: true }
          },
          {
            path: 'details/:id',
            title: 'details page',
            loadComponent: () =>
              import('./features/details/details.component')
                .then((c) => c.DetailsComponent),
            data: { skipPrerender: true }
          },
          {
            path: 'checkout/:id',
            title: 'checkout page',
            loadComponent: () =>
              import('./features/checkout/checkout.component')
                .then((c) => c.CheckoutComponent),
            data: { skipPrerender: true }
          },
        {path:'wishlist',component:WishlistComponent, title: 'wishlist page'},
        {path:'cart', component:CartComponent, title: 'cart page'},
        {path:'allorders', component:AllordersComponent, title: 'All Orders page'},
        {path:'profile', component:ProfileComponent, title: 'User Profile Page'},
        {path:'reset', component:ResetPasswordComponent, title: 'Reset Password Page'},
        {path: '**', component: NotfoundComponent, title: 'Not Found page'}
    ]},
];
