import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location, NgFor, NgIf } from '@angular/common';
import { PokemonService } from '../pokemon.service';
import { Observable, tap } from 'rxjs';
import { BriefPokemon, Pokemon, PokemonList, Results } from '../model/pokemon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule, 
    MatProgressSpinnerModule, 
    NgFor,
    NgIf
  ],
})
export class PokedexComponent implements OnInit {

  pokemons: BriefPokemon[];

  constructor(
    private location: Location,
    private pokemonService: PokemonService
  ) {  
    this.pokemons = [] as BriefPokemon[];
  }

  ngOnInit(): void {
    this.getPokemons()
  }

  getPokemons() {
    this.pokemonService.listPokemons()
      .subscribe(response  => {
        let fullPokeList: BriefPokemon[] = []
        let tinyList = response?.results!
         tinyList.map(({url}) => {
          this.pokemonService.getPokeInfo(url)
            .subscribe(resp => {
              let {order, name, types, sprites: {other: {dream_world: {front_default}}}} = resp
              const poke = {
                order: order.toString(),
                name,
                types,
                front_default
              }
              fullPokeList.push(poke as BriefPokemon)
            })
        })
        this.pokemons = fullPokeList
      })
  }

  goBack(): void {
    this.location.back();
  }
}
