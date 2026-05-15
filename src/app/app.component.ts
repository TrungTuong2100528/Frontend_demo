import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterModule } from '@angular/router';
import { InventoryComponent } from './AppComponents/inventory/inventory.component';
import { CustomerComponent } from './AppComponents/customer/customer.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatAIComponent } from './AppChatBox/chat-ai/chat-ai.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterModule, InventoryComponent, CustomerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hoc-gadget-shop';

  private modalService = inject(NgbModal);
  toggleChat(){
    this.modalService.open(ChatAIComponent)
  }
}
