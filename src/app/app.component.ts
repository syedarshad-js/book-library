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
  constructor(private modalService: NgbModal, private api: ApiService) { }
  ngOnInit() {
    this.api.getBooks()
      .subscribe(res => {
        console.log(res);
        this.books = res;
      }, err => {
        console.log(err);
      });
  }
  open(book) {
    console.log(book)
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = book.title;
    modalRef.componentInstance.author = book.author;
    modalRef.componentInstance.isbn = book.isbn;
    modalRef.componentInstance.status = book.status;
    modalRef.componentInstance.id = book._id;
  }
}
