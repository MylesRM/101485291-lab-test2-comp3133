import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HpApi } from '../../services/hp-api';
import { Character } from '../../models/character';
import { HouseLabel } from '../../pipes/house-label';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [RouterLink, HouseLabel],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css',
})
export class CharacterList implements OnInit {
  private hpApi = inject(HpApi);

  characters = signal<Character[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.hpApi.getCharacters().subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load characters');
        this.loading.set(false);
      }
    });
  }
}