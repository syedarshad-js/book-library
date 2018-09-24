import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-library';
  constructor(private modalService: NgbModal) { }
  open() {
    const modalRef = this.modalService.open(ModalComponent);
    // modalRef.componentInstance.title = 'test';
  }
}
