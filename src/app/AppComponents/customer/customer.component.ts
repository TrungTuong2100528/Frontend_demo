import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDialogBoxComponent } from '../customer-dialog-box/customer-dialog-box.component';
import { HttpClient } from '@angular/common/http';
// import { NgForOf } from "../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";
import { CommonModule, NgFor } from '@angular/common';
import { DialogBoxComponent } from '../../AppComponent/dialog-box/dialog-box.component';
@Component({
  selector: 'app-customer',
  imports: [NgFor, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  private modalService = inject(NgbModal)

  openCustomerDialog() {
    this.modalService.open(CustomerDialogBoxComponent).result.then(data => {
      //lấy event từ dialog-box sao khi thêm xong để load bảng dữ liệu lại
      if (data.event == "closed")
        this.GetCustomerDetail();
    })
  }

  httpClien = inject(HttpClient)
  customerDetails: any;

  ngOnInit() {
    this.GetCustomerDetail();
  }

  GetCustomerDetail() {
    let aipUrl = "https://tuong111-dnbke0a2f5hkd0f3.eastasia-01.azurewebsites.net/api/Customer";

    this.httpClien.get(aipUrl).subscribe(data => {
      this.customerDetails = data;
      console.log(this.customerDetails);
    })
  }
  //mở form thêm
  openConfirmDialog(customerId: any) {
    this.modalService.open(DialogBoxComponent).result.then(data => {
      if (data.event == "confirm") {
        this.DeleteCustomerDetials(customerId);
      }
    })
  }
  DeleteCustomerDetials(customerId: any) {
    let aipUrl = "https://tuong111-dnbke0a2f5hkd0f3.eastasia-01.azurewebsites.net/api/Customer?customerId=";
    this.httpClien.delete(aipUrl + customerId).subscribe(data =>
      this.GetCustomerDetail()
    );
  }


  openEditDialogBox(customer: any) {
    // modalReference để: Truyền dữ liệu vào modal
    const modalReference = this.modalService.open(CustomerDialogBoxComponent);
  
    //CustomerDialogBoxComponent đã được tạo và gán dữ liệu từ component cha → component modal
    modalReference.componentInstance.customer = {
      customerId: customer.customerId,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      registrationDate: customer.registrationDate
    };
    modalReference.result.then(data => {
      if (data.event == "closed") {
        this.GetCustomerDetail();
      }
    })
  }
}
