import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location, NgFor, NgIf } from '@angular/common';
import { PokemonService } from '../pokemon.service';
import { BriefPokemon } from '../model/pokemon';
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
  limit = 10;
  offset = 0;
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

  getPokemons(limit = 10, offset = 0) {
    this.pokemonService.listPokemons(limit, offset)
      .subscribe(response  => {
        let fullPokeList: BriefPokemon[] = []
        let tinyList = response?.results!
         tinyList.map(({url}) => {
          this.pokemonService.getPokeInfo(url)
            .subscribe(resp => {
              let {id, name, types, sprites: {other: {dream_world: {front_default}}}} = resp
              const poke = {
                order: id.toString(),
                name,
                color: types![0].type.name,
                types,
                front_default
              }
              fullPokeList.push(poke as BriefPokemon)
            })
        })
        this.pokemons= fullPokeList
      })
  }

  nextPage() {
    this.offset += 10
    this.getPokemons(this.limit, this.offset)
  }

  previousPage(){
    this.offset -= 10
    this.getPokemons(this.limit, this.offset)
  }

  goBack(): void {
    this.location.back();
  }
}
