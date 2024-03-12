import axios from "axios";

const ncNewsArticles = axios.create({baseURL: "https://nc-news-97rk.onrender.com/api/articles"})

export function getArticles(){
    return ncNewsArticles.get('/').then(({data})=>{
        return data;
    })
}

export function getArticleById(articleId){
    return ncNewsArticles.get(`/${articleId}`).then(({data: {article}})=>{
        const UTCString = new Date(article.created_at).toUTCString()
        return {...article, created_at: UTCString}
    })
}

export function getCommentsByArticleId(articleId){
    return ncNewsArticles.get(`/${articleId}/comments`).then(({data})=>{
        return data;
    })
}

export function patchArticle(articleId, vote){
    return ncNewsArticles.patch(`/${articleId}`, { "inc_votes": vote })
}