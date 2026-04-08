import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'houseLabel',
  standalone: true
})
export class HouseLabel implements PipeTransform {
  transform(value: string): string {
    return value && value.trim() ? value : 'No House';
  }
}