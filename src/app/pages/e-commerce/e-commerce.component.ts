import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent implements OnInit {

  queryParams: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the query parameters from the URL
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    });
  }
}
