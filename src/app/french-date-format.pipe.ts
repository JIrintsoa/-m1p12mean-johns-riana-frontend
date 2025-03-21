import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frenchDateFormat'
})
export class FrenchDateFormatPipe implements PipeTransform {

  transform(value: string | Date): string | null {
    if (!value) return null;
    
    // Define the French month names
    const frenchMonths = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'écembre'
    ];
    
    // Create a Date object from the input value
    const date = new Date(value);
    
    // Format the date manually
    const day = date.getDate();
    const month = frenchMonths[date.getMonth()];  // Get month in French
    const formattedDate = `${day < 10 ? '0' + day : day} ${month}`;

    return formattedDate;
  }
}

