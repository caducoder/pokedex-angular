import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Pokemon, PokemonDetails } from '../model/pokemon';
import { Location, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule, 
    MatTabsModule,
    MatProgressSpinnerModule, 
    MatProgressBarModule,
    NgFor
  ],
})
export class DetailsComponent {
  pokemon: PokemonDetails;
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    ) {
      this.pokemon = {} as PokemonDetails
    }
  
  ngOnInit() {
    const name = this.activatedRoute.snapshot.paramMap.get('pokemon');
    this.pokemonService.getDetailsByName(name!)
      .subscribe(response => {
        let total = response.stats?.reduce((acc, currentValue) => acc + currentValue.base_stat, 0)
        let joinedAbilities = response.abilities
          .map((ab) => ab.ability.name)
          .map((ab) => ab.charAt(0).toUpperCase() + ab.slice(1))
          .join(', ')

        this.pokemon = {
          ...response,
          total, 
          joinedAbilities,
          weightInKg: (response.weight * 0.1).toFixed(2),
          weightInLbs: (response.weight * 0.220462).toFixed(2),
          heightInMeters: (response.height * 0.1).toFixed(2)
        }
      })
  }

  goBack(): void {
    this.location.back();
  }
}
