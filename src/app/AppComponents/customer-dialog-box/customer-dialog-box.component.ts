import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-customer-dialog-box',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './customer-dialog-box.component.html',
  styleUrl: './customer-dialog-box.component.css'
})
export class CustomerDialogBoxComponent {
  // Lấy customer bất kỳ từ bảng dữ liệu để edit
  @Input() private customer: any;
  btnText: string = "Add";
  disableCustomerIdInput = false;

  httpClient = inject(HttpClient)
  // Đóng modal
  modal = inject(NgbActiveModal)

  customerDetails = {
    customerId: "",
    firstName: "",
    lastName: "",
    registrationDate: "",
    phone: "",
    email: ""
  }
  onSubmit() {

    let aipUrl = "https://tuong111-dnbke0a2f5hkd0f3.eastasia-01.azurewebsites.net/api/Customer";

    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: "my-auth-token",
        "Content-Type": "application/json"
      })
    }

    if (this.disableCustomerIdInput == true) {
      this.httpClient.put(aipUrl, this.customerDetails, httpOptions).subscribe(
        {
          next: v => console.log(v),
          error: e => console.log(e),
          complete: () => {
            alert("Customer details update successfully: " + JSON.stringify(this.customerDetails));

            this.modal.close({ event: "closed" });
          }
        }
      )
    } else {

      this.httpClient.post(aipUrl, this.customerDetails, httpOptions).subscribe(
        {
          next: v => console.log(v),
          error: e => console.log(e),
          complete: () => {
            alert("Customer details saved successfully: " + JSON.stringify(this.customerDetails));

            this.modal.close({ event: "closed" });
          }
        }
      )
    }
  }

  ngOnInit() {
    // khi có dữ liệu ánh xạ vào thì mới thực hiện ( tức là có dữ liệu khi click "Edit")
    if (this.customer != null) {
      this.customerDetails = this.customer; // Thuộc tính 2 cái phải như nhau mới lấy dữ liệu được

      this.btnText = "Update";
      this.disableCustomerIdInput = true;
    }
  }
}
