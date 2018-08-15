import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesComponent } from './invoices.component';
import { RoutingInvoicesModule } from './routing-invoices.module';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    RoutingInvoicesModule,
    NgxPaginationModule
  ],
  declarations: [InvoicesComponent]
})
export class InvoicesModule { }
