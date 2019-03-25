import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../service/post-service.service';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[];
  constructor(private service: PostServiceService ) { }

  ngOnInit() {
    this.service.getPosts().subscribe(ans=> this.posts =  ans.json(),(error : Response) => {
      if(error.status === 404)
      {
        alert("deja suprimee!")  
        return;
      }
      else
      throw error;
    });
  }

  createPost(input: HTMLInputElement)
  {
    let post = {title: input.value}
    this.service.createPost(JSON.stringify(post)).subscribe(ans => {
        post['id'] = ans.json().id;
        this.posts.splice(0,0,post);
    },(error: AppError) => {
      if (error instanceof AppError) {
        alert("The item was not found");
      } else throw error;
  
    });
  }

  deletePost(input :HTMLInputElement)
  {    
    this.service.deletePost(input.id).subscribe(ans => {
        let index = this.posts.indexOf(input);
        this.posts.splice(index,1);
    },(error: AppError) => {
      if (error instanceof AppError)
      {
        alert("The item was not found / already deleted.");
      }
      else
      throw error;
  
    });  
  }

}
