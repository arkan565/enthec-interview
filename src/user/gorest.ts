import axios from "axios";
import {User} from "../types/user.t";
import {Post} from "../types/post.t";


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
        
    });
}