import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../model/pokemon';
import { Location, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';

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
    NgFor
  ],
})
export class DetailsComponent {
  pokemon: Pokemon;
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    ) {
      this.pokemon = {} as Pokemon
    }
  
  ngOnInit() {
    const name = this.activatedRoute.snapshot.paramMap.get('pokemon');
    this.pokemonService.getDetailsByName(name!)
      .subscribe(response => {
        this.pokemon = response
      })
  }

  goBack(): void {
    this.location.back();
  }
}
