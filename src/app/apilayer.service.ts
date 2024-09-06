import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpOptions1 = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApilayerService {

  constructor(private http: HttpClient) {
  }

  // Local
   BaselocalUrl: string = 'http://localhost:48484/api/';

  // Own Server
  // BaselocalUrl: string = 'http://cms.origonsoft.com/api/';

  // Client Test Server
  // BaselocalUrl: string = 'https://matts.pk/CMSApi/api/';


  GetApiRequests(EndPoint) {
    return new Promise((resolve, reject) => {
      this.http.get(this.BaselocalUrl + EndPoint, httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        }).unsubscribe;
    });
  }

  GetApiRequestsByID(EndPoint, LiParam) {
    return new Promise((resolve, reject) => {
      this.http.get(this.BaselocalUrl + EndPoint + '/' + LiParam, httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        }).unsubscribe;
    });
  }


  PostApiRequests(EndPoint, Body) {
    return new Promise((resolve, reject) => {
      this.http.post(this.BaselocalUrl + EndPoint, Body, httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        }).unsubscribe;
    });
  }


  postFile(EndPoint, fileToUpload: File) {
    const endpoint = this.BaselocalUrl + EndPoint;
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return new Promise((resolve, reject) => {
      this.http
        .post(endpoint, formData, httpOptions1)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        }).unsubscribe;
    });
  }

  uploadImage(EndPoint, componentId, image) {
    const formData: FormData = new FormData();
    formData.append('Image', image, image.name);
    formData.append('ComponentId', componentId);
    return new Promise((resolve, reject) => {
      this.http.post(this.BaselocalUrl + EndPoint, formData)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        }).unsubscribe;
    });
  }


  // Error Handling Code

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

  getAllDishes(): Observable<any> {
    return this.http.get(this.BaselocalUrl + 'SelectMenuDish', { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  getAllMeals(): Observable<any> {
    return this.http.get(this.BaselocalUrl + 'SelectMeal', { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  getAllMedias(): Observable<any> {
    return this.http.get(this.BaselocalUrl + 'getAllMedia', { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  deleteMediaById(id): Observable<any> {
    return this.http.post(this.BaselocalUrl + 'deleteMediaById?mediaId='+id, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  downloadVideoByName(name): Observable<any> {
    return this.http.get(this.BaselocalUrl + 'downloadVideo?videoName='+name, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  getAllMenuDetails(): Observable<any> {
    return this.http.get(this.BaselocalUrl + 'SelectMenuDetail', { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  saveAllMenuDetails(data: any): Observable<any> {

    let menuDetails=JSON.stringify(data);
    let dispatch = "{'menu':" + "'" + menuDetails + "'}";
    return this.http.post(this.BaselocalUrl + 'saveAll', dispatch, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  saveMenu(data: any): Observable<any> {
    return this.http.post(this.BaselocalUrl + 'saveMenu', data, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  publishMenu(data: any): Observable<any> {
    return this.http.post(this.BaselocalUrl + 'publishMenu', data, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }
  getAllMenu(): Observable<any> {
    return this.http.get(this.BaselocalUrl + 'getAllMenus', { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }
  deleteMenuById(id): Observable<any> {
    return this.http.post(this.BaselocalUrl + 'deleteMenuById?menuId='+id, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }
}
