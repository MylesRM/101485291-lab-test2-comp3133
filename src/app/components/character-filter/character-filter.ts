import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HpApi } from '../../services/hp-api';
import { Character } from '../../models/character';

@Component({
  selector: 'app-character-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './character-filter.html',
  styleUrl: './character-filter.css',
})
export class CharacterFilter {
  private hpApi = inject(HpApi);

  houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
  filteredCharacters = signal<Character[]>([]);
  loading = signal(false);

  filterForm = new FormGroup({
    house: new FormControl('Gryffindor')
  });

  onFilter(): void {
    const selectedHouse = this.filterForm.value.house;
    if (!selectedHouse) return;

    this.loading.set(true);

    this.hpApi.getCharactersByHouse(selectedHouse).subscribe({
      next: (data) => {
        this.filteredCharacters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.filteredCharacters.set([]);
        this.loading.set(false);
      }
    });
  }
}