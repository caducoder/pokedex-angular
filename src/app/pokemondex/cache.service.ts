import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BriefPokemon } from './model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  // A HashMap to store the cache. The key is the page and the value is the data.
  private cache = new Map<string, BriefPokemon[]>();

  public cache$ = new BehaviorSubject<BriefPokemon[]>([]);


  set(key: string, data: BriefPokemon[]): void {
    if (this.cache.has(key)) {
      throw new Error(`Data already exists for key '${key}'. Use a different key or delete the existing one first.`);
    }
    // If there is no data for this key, we store it in the cache and update the BehaviorSubject.
    this.cache.set(key, data);
    this.cache$.next(this.cache.get(key)!);
  }

  get(key: string): BriefPokemon[] {
    // We retrieve the data from the cache and update the BehaviorSubject.
    const data = this.cache.get(key);
    this.cache$.next(data!);
    return data!;
  }

  // The 'clear' method to clear data from the cache.
  clear(key: string): void {
    this.cache.delete(key);
    this.cache$.next([]);
  }
}
