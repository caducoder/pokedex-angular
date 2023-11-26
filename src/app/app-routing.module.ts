import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokemondex/pokedex/pokedex.component';
import { HomeComponent } from './pokemondex/home/home.component';
import { DetailsComponent } from './pokemondex/details/details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'pokedex', 
    component: PokedexComponent,
  },
  {
    path: 'pokedex/:pokemon', 
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
