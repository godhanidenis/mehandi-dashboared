import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllCategory() {
    // let params = new HttpParams()
    //   .set('record', action?.record)
    //   .set('page', action?.page);
    // {
    //     params: params,
    //   }
    return this.httpClient.get(
      'http://mahendibackend-env.eba-3d3vtnhx.us-east-2.elasticbeanstalk.com/api/allCategories/'
    );
  }

  updateCategory(id: any, updateCategory: any) {
    return this.httpClient.put(
      'http://mahendibackend-env.eba-3d3vtnhx.us-east-2.elasticbeanstalk.com/api/categories/' +
        id +
        '/',
      updateCategory
    );
  }

  // deleteUser(id: any) {
  //   return this.httpClient.delete(environment.baseUrl + '/appuser/' + id);
  // }
}
