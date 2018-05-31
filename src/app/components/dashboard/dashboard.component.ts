import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Constants } from '../../shared/constants';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  dashboard: any = {};
  public newOrders;
  public pendingOrders;
  public completedOrders;
  public latestOrdersList;
  public recentProductsList;

  constructor(private dashboardSrv: DashboardService) { }

  ngOnInit() {
    this.dashboardSrv.fetchDashboardDAta().subscribe(response => {
      let res = Constants.extractData(response);//JSON.parse(response['_body']);//(response.json()) ;
      this.newOrders = res[0]['new_orders']['0'] ? res[0]['new_orders']['0']['total'] : 0;

      this.pendingOrders = res[1]['pending_orders']['0'] ? res[1]['pending_orders']['0']['total'] : 0;
      this.completedOrders = res[2]['completed_orders']['0'] ? res[2]['completed_orders']['0']['total'] : 0;

    }, error => {

    })
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

}
