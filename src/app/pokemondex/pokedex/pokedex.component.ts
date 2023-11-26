import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location, NgFor, NgIf } from '@angular/common';
import { PokemonService } from '../pokemon.service';
import { BriefPokemon } from '../model/pokemon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CacheService } from '../cache.service';
import { Subscription, map } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule, 
    RouterModule,
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
  private cacheSubscription: Subscription;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    private cacheService: CacheService
  ) {  
    this.cacheSubscription = this.cacheService.cache$.subscribe(data => {
      this.pokemons = data;
    });

    this.pokemons = [] as BriefPokemon[];
  }

  ngOnInit(): void {
    const offset$ = this.activatedRoute.queryParams.pipe(
      map(x => x['offset'])
    );

    offset$.subscribe(offset => {
      const offsetParam = +offset
      const offsetC = isNaN(offsetParam) ? 0 : offsetParam
      this.offset = offsetC
      this.getPokemons(offsetC || 0);
    });
    //this.getPokemons(0)
  }

  getPokemons(offset = 0) {
    const cachedData = this.cacheService.get(offset.toString())

    if(!cachedData) {
      this.pokemonService.listPokemons(10, offset)
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

          this.cacheService.set(offset.toString(), fullPokeList)
          this.pokemons= fullPokeList
        })
    } else {
      this.pokemons = cachedData
    }
  }

  nextPage() {
    this.offset += 10
    this.getPokemons(this.offset)
    this.location.go(`pokedex?offset=${this.offset}`)
  }

  previousPage(){
    this.offset -= 10
    this.getPokemons(this.offset)
    this.location.go(`pokedex?offset=${this.offset}`)
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.cacheSubscription.unsubscribe();
    this.cacheService.clear('0'); 
  }
}
