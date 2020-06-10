import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../../core';

@Pipe({
    name: 'todoStatus',
    pure: false
})
export class TodoStatusPipe implements PipeTransform {
    transform(items: TodoItem[], arg: string): TodoItem[] {
        if (!items || !arg) { return items; }

        switch(arg) {
            case 'active':
                return items.filter(item => !item.completed);
            case 'completed':
                return items.filter(item => item.completed);
            default: 
                return items;
        }
    }
}