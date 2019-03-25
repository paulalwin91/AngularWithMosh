import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler{
  handleError(error){
    alert("Something went wrong. From Global Error hanlder");  
    console.log(error);
  }
}