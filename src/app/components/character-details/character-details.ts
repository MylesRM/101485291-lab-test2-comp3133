import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HpApi } from '../../services/hp-api';
import { Character } from '../../models/character';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [],
  templateUrl: './character-details.html',
  styleUrl: './character-details.css',
})
export class CharacterDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private hpApi = inject(HpApi);

  character = signal<Character | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading.set(false);
      return;
    }

    this.hpApi.getCharacterById(id).subscribe({
      next: (data) => {
        this.character.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}