import cheerio from "cheerio";
import axios from "axios";

import {AppData} from "../types/appData.t";

const getAppInfo = async (url:string) =>{
    const $ = cheerio.load((await axios.get(url)).data);
    const appData: AppData = {
        title:$('h1.AHFaub > span').contents()[0].data||'',
        description: $('div.W4P4ne > meta').attr('content')||'',
        downloads: $('div.hAyfc>span.htlgb>div.IQ1z0d>span.htlgb').contents()[2].data||''

    }
    return appData;
}

const findAppsByUrl = (url:string) =>{
    return new Promise(async (resolve, reject) => {
        const $ = cheerio.load((await axios.get(url)).data);
        const apps = $('a.poRVub');
        let appInfo: AppData[] = [];
        for(let i = 0; i<5 || apps.length<i; i++){
            appInfo = [...appInfo,await getAppInfo(`https://play.google.com${$(apps[i]).attr('href')}`)];
        }
        resolve (appInfo);
    });
}
export const findApps = () =>{
    return new Promise(async (resolve, reject) => {
        findAppsByUrl(`https://play.google.com/store/apps`).then(result =>{
            resolve(result);
        });
    });
}
export const findAppsByCattegory = (category:string) =>{
    return new Promise((resolve, reject) => {
        findAppsByUrl(`https://play.google.com/store/apps/category/${category}`).then(result =>{
            resolve(result);
        });
    });
}