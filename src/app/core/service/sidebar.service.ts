import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  isExpanded: boolean = true;
  private toggleSource = new Subject<boolean>();
  toggle$ = this.toggleSource.asObservable();

  toggle() {
    this.isExpanded = !this.isExpanded;
    this.toggleSource.next(this.isExpanded);
  }

  collapse() {
    this.isExpanded = false;
    this.toggleSource.next(this.isExpanded);
  }
}
