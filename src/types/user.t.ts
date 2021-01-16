import {  Post } from "./post.t";
export  type User = {
    "id":Number,
    "name":string,
    "email":string,
    "gender":string,
    "status":string,
    "created_at":Date,
    "updated_at":Date
    "posts"?:Array<Post>
}

