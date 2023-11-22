import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokemondex/pokedex/pokedex.component';
import { HomeComponent } from './pokemondex/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pokedex', component: PokedexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
