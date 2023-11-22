import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexComponent } from './pokedex/pokedex.component';
import { HomeComponent } from './home/home.component';
import { PokemondexRoutingModule } from './pokemondex-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PokedexComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PokemondexRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PokemondexModule { }
