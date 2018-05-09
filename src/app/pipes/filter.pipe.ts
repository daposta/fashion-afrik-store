import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) {
            console.log('no item');
            return [];
        }
        if (!searchText) {
            console.log('no text');
            return items;
        }
        searchText = searchText.toLowerCase();
        console.log(searchText);
        return items.filter(it => {
            return it.toLowerCase().includes(searchText);
        });
    }
}