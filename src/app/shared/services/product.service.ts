import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getAllProduct() {
    return this.httpClient.get(
      'http://mahendibackend-env.eba-3d3vtnhx.us-east-2.elasticbeanstalk.com/api/allDesigns/'
    );
  }
}
