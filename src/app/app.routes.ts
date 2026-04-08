import { Routes } from '@angular/router';
import { CharacterList } from './components/character-list/character-list';
import { CharacterFilter } from './components/character-filter/character-filter';
import { CharacterDetails } from './components/character-details/character-details';
import { SpellList } from './components/spell-list/spell-list';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: 'characters', component: CharacterList },
  { path: 'filter', component: CharacterFilter },
  { path: 'details/:id', component: CharacterDetails },
  { path: 'spells', component: SpellList }
];