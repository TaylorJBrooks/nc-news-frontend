import axios from "axios";

const ncNews = axios.create({baseURL: "https://nc-news-97rk.onrender.com/api"})

export function getArticles(){
    return ncNews.get('/articles').then(({data})=>{
        return data;
    })
}

export function getArticleById(articleId){
    return ncNews.get(`/articles/${articleId}`).then(({data})=>{
        return data;
    })
}

export function getCommentsByArticleId(articleId){
    return ncNews.get(`/articles/${articleId}/comments`).then(({data})=>{
        return data;
    })
}