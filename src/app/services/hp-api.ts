import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character';
import { Spell } from '../models/spell';

@Injectable({
  providedIn: 'root',
})
export class HpApi {
  private http = inject(HttpClient);
  private baseUrl = 'https://hp-api.onrender.com/api';

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters`);
  }

  getCharactersByHouse(house: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters/house/${house}`);
  }

  getCharacterById(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  getSpells(): Observable<Spell[]> {
    return this.http.get<Spell[]>(`${this.baseUrl}/spells`);
  }
}