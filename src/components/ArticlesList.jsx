import React, { useEffect, useState } from 'react'
import { getArticles } from '../../api'
import ArticleCard from './ArticleCard'
import Loading from './Loading'

export default function ArticlesList() {
    const [articlesListItems, setArticlesListItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(true)
        getArticles().then(({articles, total_count})=>{
            setArticlesListItems(articles)
            setIsLoading(false)
        })
    }, [])

  return isLoading ? <Loading/> : (
    <ul className='articles-list'>
        {articlesListItems.map((article)=>{
            return <ArticleCard key={article.article_id} article={article}/>
        })}
    </ul>
  )
}
