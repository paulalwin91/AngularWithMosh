import { Injectable } from '@angular/core';
import {HttpModule, Http} from '@angular/http'
import { catchError ,retry} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
private url: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http:Http) { }

  getPosts(){
    return this.http.get(this.url);
  }
  createPost(post: String)
  {
        return this.http.post(this.url,post).pipe(retry(1),catchError((error :Response) => {
      if(error.status === 404)
      {
      return throwError(new NotFoundError(error))  
      }
      return throwError(new AppError(error))
    }));
  }

  deletePost(id: string){
    
    return this.http.delete(this.url + "/" + id).pipe(retry(1),catchError((error:Response) => {
      if(error.status === 404)
      {
        return throwError(new NotFoundError(error))  
      }
      return throwError(new AppError(error))
    }));
  }
  

}
