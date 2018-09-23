// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-search-box',
//   templateUrl: './search-box.component.html',
//   styleUrls: ['./search-box.component.css']
// })
// export class SearchBoxComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }

import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Component, NgZone, ViewChild} from '@angular/core';
import {take} from 'rxjs/operators';

/** @title Auto-resizing textarea */
@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class  SearchBoxComponent implements OnInit {
  constructor(private ngZone: NgZone) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
