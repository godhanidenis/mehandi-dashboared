import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getAllProduct(action: any) {
    let params = new HttpParams()
      .set('page_size', action?.page_size)
      .set('page', action?.page);

    return this.httpClient.get('/api/allproducts/', {
      params: params,
    });
  }

  getProduct(action: any) {
    let params = new HttpParams()
      .set('page', action?.page)
      .set('category_id', action?.category_id);

    return this.httpClient.get('/api/products/', {
      params: params,
    });
  }

  deleteProduct(id: any) {
    return this.httpClient.delete('/api/products/' + id + '/');
  }
}
