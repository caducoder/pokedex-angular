import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexComponent } from './pokedex/pokedex.component';
import { HomeComponent } from './home/home.component';
import { PokemondexRoutingModule } from './pokemondex-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    PokedexComponent,
    HomeComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    PokemondexRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class PokemondexModule { }
