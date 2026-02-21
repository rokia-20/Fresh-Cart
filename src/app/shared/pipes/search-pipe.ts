import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(arr: any[] | null | undefined, searchTerm: string | null | undefined): any[] {
    if (!arr) return []; 
    if (!searchTerm?.trim()) return arr; 
    
    const lowerSearch = searchTerm.toLowerCase().trim();
    
    return arr.filter((item) => {
      const searchableText = [
        item?.title,
        item?.name,
        item?.description,
        item?.brand,
        item?.category
      ]
        .filter(Boolean)
        .join(' ') 
        .toLowerCase();
      
      return searchableText.includes(lowerSearch);
    });
  }
}
