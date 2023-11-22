import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
})
export class PokedexComponent {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
