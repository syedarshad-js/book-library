import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-library';
  books: any;
  searchBy = { filter: 'title' };
  searchThis: String;
  searchModified: Boolean;
  postLoad = false;
  constructor(private modalService: NgbModal, private api: ApiService) { }
  ngOnInit() {
    this.api.getBooks()
      .subscribe(res => {
        this.books = res;
        this.postLoad = true;
      }, err => {
        console.log(err);
      });
  }
  open(book) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = book.title;
    modalRef.componentInstance.author = book.author;
    modalRef.componentInstance.isbn = book.isbn;
    modalRef.componentInstance.status = book.status;
    modalRef.componentInstance.id = book._id;
    modalRef.componentInstance.event.subscribe(data => {
      book.status = data.status;
    });
  }

  searchBooks() {
    if (this.searchThis) {
      this.searchModified = false;
      let filter = {
        find: this.searchThis,
        by: this.searchBy.filter
      }
      this.api.searchBooks(filter)
        .subscribe(res => {
          this.books = res;
        }, err => {
          console.log(err);
        });
    }
  }

  valuechange(e) {
    if (!e) {
      this.ngOnInit();
    } else {
      this.searchModified = true;
    }
  }
}
