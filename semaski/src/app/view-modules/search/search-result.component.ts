import { Component, Input } from '@angular/core';
import { File } from '../../entities';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent {
  @Input() files: File[];
}
