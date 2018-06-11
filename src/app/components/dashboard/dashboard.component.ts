import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ProductService } from '../../services/product.service'
import { Constants } from '../../shared/constants';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService, ProductService]
})
export class DashboardComponent implements OnInit {

  dashboard: any;
  public newOrders: any;
  public pendingOrders: any;
  public completedOrders: any;
  public latestOrdersList: any;
  public recentProductsList: any;
  public approvedProducts: any;
  public pendingProducts: any;
  public latestProduct: any;

  constructor(private dashboardSrv: DashboardService, private productSrv: ProductService) { }

  ngOnInit() {
    this.dashboardSrv.fetchDashboardDAta().subscribe(response => {
      let res = Constants.extractData(response);
      // console.log(res);
      this.newOrders = res.data[0]['new_orders'];
      this.pendingOrders = res.data[1]['pending_orders'];
      this.completedOrders = res.data[2]['completed_orders'];
      this.approvedProducts = res.data[3]['approved_products'];
      this.pendingProducts = res.data[4]['pending_products'];

    }, error => {

      console.log(error);
    });

    this.fetchProducts();
    // this.fetchLatestOrders();
    // this.fetchRecentProducts();
  }


  // fetchLatestOrders() {
  //   this.dashboardSrv.fetchLatestOrders().subscribe(res => {
  //     this.latestOrdersList = Constants.extractData(res).results;
  //   }, error => {

  //   })
  // }

  // fetchRecentProducts() {
  //   this.dashboardSrv.fetchRecentProducts().subscribe(res => {
  //     this.recentProductsList = Constants.extractData(res).results;
  //   }, error => {

  //   })
  // }

  fetchProducts() {
    this.productSrv.fetchProducts().subscribe((res: any) => {

      this.latestProduct = res.data[0];
      console.log(this.latestProduct);
    }, err => {

      console.log(err);
    })
  }

}
