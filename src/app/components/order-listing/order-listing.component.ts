import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.css'],
   providers: [ OrderService ]
})
export class OrderListingComponent implements OnInit {
 
  store_orders: any[];
  error: any;

  constructor(private orderSrv:OrderService) { }

  ngOnInit() {
    this.fetchOrders();
  }


  orderDetail(){
  	
  }

  fetchOrders(){
  	this.orderSrv.fetchOrders().then(response=> this.store_orders = response.results)
    .catch(err => this.error = err)
  }

}
