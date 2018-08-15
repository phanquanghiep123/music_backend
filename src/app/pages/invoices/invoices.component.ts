import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice'
import { Service } from '../../models/service'
import {InvoicesService} from '../../services/invoices.service';
import {AppComponent} from '../../app.component';
import {PagesComponent} from '../../pages/pages.component';
import {NgxPaginationModule} from 'ngx-pagination';
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})

export class InvoicesComponent implements OnInit {
  page_title = 'Manage Invoices';
  add_link = '/invoices/add';
  invoices: Invoice[];
  service: Service;
  statusInvoice = [
    "create",
    "checkout",
    "success",
    "cancel",
    "api error"
  ];
  
  constructor(
    private invoicesService: InvoicesService,
    private pagesComponent: PagesComponent,
    private app: AppComponent
  ) {
    this.pagesComponent.page_title = this.page_title;
    this.pagesComponent.add_link = this.add_link;
  }
  ngOnInit() {
    this.invoicesService.gets(1).subscribe(
      service => {
        this.service = service;
        this.service.page = 1;
        if (this.service.status == true) {
          this.invoices = this.service.response;
        }
        this.app.loading = false;
      }, error => {
        this.app.loading = false;
      }
    );
  }
  Delete(index: number, item: Invoice) {
    this.app.loading = true;
    if (confirm("Are you sure to delete " + item.invoice_id)) {
      this.invoicesService.destroy(item.id).subscribe(
        data => {
          this.invoices.splice(index, 1);
          this.app.loading = false;
        }, error => {
          this.app.loading = false;
        }
      );
    }
    return false;
  }
  ngOnDestroy(): void {
    this.app.loading = true;
    window.scrollTo(0, 0);
  }
  getPage(page){
    this.invoicesService.gets(page).subscribe(
      data => {
        this.service = data;
        console.log(this.service);
        if (this.service.status == true) {
          this.invoices = this.service.response;
        }
        this.app.loading = false;
      }, error => {
        this.app.loading = false;
      }
    );
  }
}
