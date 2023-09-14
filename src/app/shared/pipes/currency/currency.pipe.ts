import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number): string {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'ILS', minimumFractionDigits: 0}).format(value);

  }
}
