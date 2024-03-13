import axios from "axios";

const ncNewsArticles = axios.create({baseURL: "https://nc-news-97rk.onrender.com/api/articles"})

export function getArticles(orderBy, sortBy, topicName){
    return ncNewsArticles.get('', {params: {topic: topicName, order: orderBy, sort_by: sortBy}}).then(({data})=>{
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

export function postComment(articleId, newComment){
    return ncNewsArticles.post(`/${articleId}/comments`, newComment).then(({data})=>{
        return data;
    })
}

const ncNewsUsers = axios.create({baseURL: "https://nc-news-97rk.onrender.com/api/users"})

export function getUsers(){
    return ncNewsUsers.get('/').then(({data})=>{
        return data;
    })
}

const ncNewsComments = axios.create({baseURL: "https://nc-news-97rk.onrender.com/api/comments"})

export function deleteComment(commentId){
    return ncNewsComments.delete(`/${commentId}`)
}

const ncNewsTopics = axios.create({baseURL: "https://nc-news-97rk.onrender.com/api/topics"})

export function getTopics(){
    return ncNewsTopics.get('/').then(({data})=>{
        return data;
    })
}