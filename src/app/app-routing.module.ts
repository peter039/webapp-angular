import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/table/table.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path:'' , component: HeaderComponent , children:[
    {path:'', redirectTo:'/home', pathMatch: 'full'},
    {path:'home' , component: HomeComponent},
    {path:'table' , component: TableComponent},
    {path:'table/:id', component: UsersComponent}
  
  ]},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
