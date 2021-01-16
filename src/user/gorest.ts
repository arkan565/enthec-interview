import axios from "axios";
import {User} from "../types/user.t";
import {Post} from "../types/post.t";

const gorestGetUserById = (id:Number) => {
    
    return new Promise<User>(async (resolve, reject) => {
        const axiosResult = await axios.get(`https://gorest.co.in/public-api/users/${id}`);
        if(axiosResult.data.code!==200)reject(axiosResult.data.data.messsage);
        resolve(axiosResult.data.data)
    });
    
}
const gorestGetPostsFromUser =async (id:Number) => {
    let posts :Array<Post> = [];
    let total = 1;
    let page = 1;
    while(posts.length<total){
        const axiosResult = await axios.get(`https://gorest.co.in/public-api/users/${id}/posts?page=${page}`);
        if(axiosResult.data.code!==200)return {message:axiosResult.data.data.messsage};
        total = axiosResult.data.meta.pagination.total;
        posts = [...posts, ...axiosResult.data.data];
        page++;
    };
    return posts;
}


export const findUsers = (page?:string, limit?:string) =>{
    return new Promise(async (resolve, reject) => {
        const nPage = page?parseInt(page)||1:1;
        const nLimit = limit?parseInt(limit) || 20 :20;
        let apiPage = (nLimit*nPage)/20;
        let userList :Array<User> = [];

        if(nLimit && nLimit%20!==0) return reject('limit must be a multiple of 20');
        
        while(userList.length<nLimit){
            const axiosResult = await axios.get(`https://gorest.co.in/public-api/users?page=${apiPage}`);
            userList = [...userList,...axiosResult.data.data]
            apiPage++;
        }
        
        return resolve(userList);
        
    });
}


export const findUserById = (id:Number) =>{
    return new Promise((resolve, reject) => {
        if(!id)return reject('User Id must be a valid Integer');
        gorestGetUserById(id).then(async (result:User)=>{
            let user : User = result;
            let postResult = await gorestGetPostsFromUser(id);
            if((postResult as {message:any}).message) reject((postResult as {message:any}).message)
            user.posts= postResult as Post[];
            resolve(user);
        }).catch(err=>{
            return reject(err);
        });
    });
}