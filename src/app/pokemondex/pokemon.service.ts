import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, PokemonList } from './model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient: HttpClient) { }

  listPokemons(): Observable<PokemonList> {
    return this.httpClient.get<PokemonList>('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
  }

  getPokeInfo(url: string){
    return this.httpClient.get<Pokemon>(url)
  }
}
