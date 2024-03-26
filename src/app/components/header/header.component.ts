import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('content', { static: true }) modalConten!: TemplateRef<any>;
  private modalService = inject(NgbModal);
  closeResult = '';
  imageUrl: string = '';
  ngOnInit(): void {
    // this.open(this.modalConten);
  }
  getUrl(e: any) {
    const file: File = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      this.imageUrl = base64data as string;
    };
    reader.readAsDataURL(file);
  }
  clearUrl() {
    this.imageUrl = '';
  }
  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
