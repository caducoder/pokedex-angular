import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, PokemonList } from './model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient: HttpClient) { }

  listPokemons(limit: number, offset: number): Observable<PokemonList> {
    return this.httpClient.get<PokemonList>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}'`)
  }

  getPokeInfo(url: string){
    return this.httpClient.get<Pokemon>(url)
  }

  getDetailsByName(name: string) {
    return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`)
  }
}
