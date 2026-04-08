import { Component, OnInit, inject, signal } from '@angular/core';
import { HpApi } from '../../services/hp-api';
import { Spell } from '../../models/spell';

@Component({
  selector: 'app-spell-list',
  standalone: true,
  imports: [],
  templateUrl: './spell-list.html',
  styleUrl: './spell-list.css',
})
export class SpellList implements OnInit {
  private hpApi = inject(HpApi);

  spells = signal<Spell[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.hpApi.getSpells().subscribe({
      next: (data) => {
        this.spells.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}