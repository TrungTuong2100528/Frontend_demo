import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../AppComponent/dialog-box/dialog-box.component';
@Component({
  selector: 'app-inventory',
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  //Lấy service HttpClient để Gọi API ; tương đương với constructor(private httpClient: HttpClient) {}
  httpClient = inject(HttpClient)
  productIDToDelete: number = 0;
  private modalService = inject(NgbModal)

  //Get
  inventoryDetails: any; //Lưu dữ liệu API trả về


  inventoryData = {
    productID: "",
    productName: "",
    availableQty: 0,
    reOderPoint: 0
  }

  ngOnInit() { //Hàm chạy khi component được load
    this.getInventoryDetails();
  }


  getInventoryDetails() {
    let aipUrl = "https://localhost:7243/api/Inventory";

    this.httpClient.get(aipUrl).subscribe(data => { //Angular gửi HTTP GET; subscribe() để: Nhận dữ liệu async
      this.inventoryDetails = data; //Gán dữ liệu cho biến
      console.log(this.inventoryDetails) //Log để debug
    })

    // Thiết lập lại sao khi put
    this.inventoryData = {
      productID: "",
      productName: "",
      availableQty: 0,
      reOderPoint: 0
    }
    this.disavledProductIdInput = false;
  }


  disavledProductIdInput = false;

  oSubmit(): void { //Chạy khi bấm nút Submit

    let aipUrl = "https://localhost:7243/api/Inventory";
    let httpOptions = { //Cấu hình HTTP Header
      headers: new HttpHeaders({
        Authorization: "my-auth-token", //Token (demo)
        "Content-Type": "application/json" //Báo cho API biết gửi JSON
      })
    }
    //Điều kiện trước khi post or put
    if (this.disavledProductIdInput == true) {
      this.httpClient.put(aipUrl, this.inventoryData, httpOptions).subscribe({
        next: v => console.log(v), //API trả dữ liệu thành công
        error: e => console.log(e), //API lỗi (400 / 500)
        complete: () => { //Request hoàn tất
          alert("Form Submitted successfully" + JSON.stringify(this.inventoryData));
          this.getInventoryDetails();
        }
      });
    }
    else {
      this.httpClient.post(aipUrl, this.inventoryData, httpOptions).subscribe({
        next: v => console.log(v),
        error: e => console.log(e),
        complete: () => {
          alert("Form Submitted successfully" + JSON.stringify(this.inventoryData));
          this.getInventoryDetails();
        }
      });
    }
  }

  // Delete
  openConfirmDialog(productID: number) {
    this.productIDToDelete = productID;
    console.log(this.productIDToDelete);
    this.modalService.open(DialogBoxComponent).result.then(data => {
      if (data.event == "confirm") {
        this.deleteInventory();
      }
    })
  }
  deleteInventory(): void {
    let aipUrl = "https://localhost:7243/api/Inventory?productId=" + this.productIDToDelete;

    this.httpClient.delete(aipUrl).subscribe(data => {
      this.getInventoryDetails();
    });
  }

  //Put
  popularFormForEdit(inventory: any) {
    this.inventoryData.productID = inventory.productID;
    this.inventoryData.productName = inventory.productName;
    this.inventoryData.availableQty = inventory.availableQty;
    this.inventoryData.reOderPoint = inventory.reOderPoint;

    //Ngăn chặn nhập
    this.disavledProductIdInput = true;
  }

  //Lấy giá trị nhập tìm kiếm
  enterSearchData: string = "";
  // Lưu giá trị productname 
  SearchProductName: string = "";
  //search

  SearchInventory(productName: string) {
    this.SearchProductName = productName;
    if (this.SearchProductName == "") {
      this.getInventoryDetails();
      return;
    }else{
      let aipUrl = "https://localhost:7243/api/Inventory/search?productName=" + this.SearchProductName;
      this.httpClient.get(aipUrl).subscribe(data => {
        this.inventoryDetails = data;
        console.log(this.inventoryDetails)
      })
    }
  }
}
