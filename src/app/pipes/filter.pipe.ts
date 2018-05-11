import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(value: any, args?: any): any {

        if (!value) return null;
        if (!args) return value;

        args = args.toLowerCase();

        return value.filter(function (item) {
            return JSON.stringify(item).toLowerCase().includes(args);
        });
    }

    // transform(items: any[], searchText: string): any[] {
    //     if (!items) {
    //         console.log('no item');
    //         return [];
    //     }
    //     if (!searchText) {
    //         console.log('no text');
    //         return items;
    //     }
    //     searchText = searchText.toLowerCase();
    //     console.log(searchText);
    //     return items.filter(it => {
    //         return it.toLowerCase().includes(searchText);
    //     });
    // }
}