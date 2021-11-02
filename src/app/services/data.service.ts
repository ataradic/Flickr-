
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs'
import { map } from 'rxjs/operators';
import { BadInput } from './../errors/bad-input';
import { NotFoundError } from './../errors/not-found-error';
import { AppError } from './../errors/app-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public getAll() {
    return this.http.get(this.url)
      .pipe(
      map((Response:any)=>Response.photos),
      catchError(this.handleError)
    );
  }
  public getByPage(page:number) {
    return this.http.get(this.url+'&page='+page)
      .pipe(
      map((Response:any)=>Response.photos),
       catchError(this.handleError)
    );}
  private handleError(error: Response) {
    if (error.status === 404)
      return throwError(new NotFoundError(error));
        if (error.status === 400)
      return throwError(new BadInput(error));
    else return throwError(new AppError(error));
  }

  constructor(@Inject('url') private url: string, private http: HttpClient) { }
}



