import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'saudacao',
  standalone: true,
})
export class SaudacaoPipe implements PipeTransform {
  transform(nome: string): string {
    const hora = new Date().getHours();

    let msg = 'Bom dia';
    if (hora >= 12 && hora < 18) msg = 'Boa tarde';
    if (hora >= 18 || hora < 5) msg = 'Boa noite';

    return `${msg}, ${nome}`;
  }
}