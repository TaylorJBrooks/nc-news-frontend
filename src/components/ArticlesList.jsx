import React, { useEffect, useState } from 'react'
import { getArticles } from '../../api'
import ArticleCard from './ArticleCard'

export default function ArticlesList() {
    const [articlesListItems, setArticlesListItems] = useState([])

    useEffect(()=>{
        getArticles().then(({articles, total_count})=>{
            setArticlesListItems(articles)
        })
    }, [])

  return (
    <ul className='articles-list'>
        {articlesListItems.map((article)=>{
            return <ArticleCard key={article.article_id} article={article}/>
        })}
    </ul>
  )
}
