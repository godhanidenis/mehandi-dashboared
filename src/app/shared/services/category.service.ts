import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface CustomerMessage {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAllCategory(action: any) {
    let params = new HttpParams()
      .set('page_size', action?.page_size)
      .set('page', action?.page);

    return this.httpClient.get('/api/categories/', {
      params: params,
    });
  }

  updateCategory(id: any, updateCategory: any) {
    return this.httpClient.put(
      '/api/categories/' + id + '/',
      updateCategory
    );
  }

  deleteCategory(id: any) {
    return this.httpClient.delete('/api/categories/' + id + '/');
  }
}
