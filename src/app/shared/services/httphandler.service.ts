import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
export abstract class HttpError {
    constructor(public text: any) { }
}

@Injectable({providedIn:'root'})
export class HttpHandlerService {

    constructor(private http: HttpClient) {
    }

    get(url, headers = {}, params = {}): Observable<any> {
        return this.http.get(url,{headers: new HttpHeaders(headers) ,params:params})
    }

    post(url, body, headers = {}, params = {}): Observable<any> {
        return this.http.post(url,body,{headers: new HttpHeaders(headers) ,params:params})
    }

    put(url, body, headers = {}, params = {}): Observable<any> {
        return this.http.put(url, body,{headers: new HttpHeaders(headers) ,params:params})
    }

    patch(url, body, headers = {}, params = {}): Observable<any> {
        return this.http.patch(url, body,{headers: new HttpHeaders(headers) ,params:params})
    }

    delete(url, headers = {}, params = {}): Observable<any> {
        return this.http.delete(url,{headers: new HttpHeaders(headers) ,params:params});
    }

    request(method, url, body, headers = {}, params = {}){
        return this.http.request(method, url, {body, headers: new HttpHeaders(headers), params});
    }
}
