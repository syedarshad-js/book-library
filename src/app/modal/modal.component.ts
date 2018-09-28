import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ApiService } from '../api.service';

const readers = ['john', 'sam', 'floyd', 'arshad'];

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  public issueTo: any;
  public status: any;
  public id: any;
  public history: any;
  public lastIssueId: any;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal, private api: ApiService
  ) {
  }

  ngOnInit() {
    this.fetchIssueHistory(this.id);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : readers.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  issueBook(id, issueTo) {
    this.api.issueBook(id, issueTo)
      .subscribe(res => {
        this.status = "Issued";
        this.event.emit({ status: "Issued" });
        this.fetchIssueHistory(id);
      }, err => {
        console.log(err);
      });
  }

  returnBook(id, lastIssueId) {
    console.log(id)
    console.log(lastIssueId)
    this.api.returnBook(id, lastIssueId)
      .subscribe(res => {
        this.status = "Available";
        this.event.emit({ status: "Available" });
        this.fetchIssueHistory(id);
      }, err => {
        console.log(err);
      });
  }

  fetchIssueHistory(id) {
    this.api.issueHistory(id)
      .subscribe(res => {
        this.history = res;
        this.history.forEach(issue => {
          if (!issue.returnedOn) {
            this.lastIssueId = issue._id;
          }
        });
      }, err => {
        console.log(err);
      });
  }

}
