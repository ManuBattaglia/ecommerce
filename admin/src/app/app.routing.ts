import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

const appRout : Routes = [
    {path: '', component: InicioComponent},
    {path: 'login', component: LoginComponent}  
]

export const appRoutingProviders : any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRout);