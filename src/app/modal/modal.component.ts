import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

const readers = ['Syed Arshad', 'Sam', 'Ran Vijay', 'CNB'];

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  public issueTo: any;

  constructor(
     public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {

  }

  search = (text$: Observable<string>) =>
   text$.pipe(
     debounceTime(200),
     distinctUntilChanged(),
     map(term => term.length < 2 ? []
       : readers.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
   )

   issueBooks(){
     console.log("issue it")
   }

}
