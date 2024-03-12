import React, { useEffect, useState } from 'react'
import { getArticles } from '../../api'
import ArticleCard from './ArticleCard'
import Loading from './Loading'
import { useParams } from 'react-router-dom'

export default function ArticlesList() {
    const [articlesListItems, setArticlesListItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {topic_name} = useParams()

    useEffect(()=>{
        setIsLoading(true)
        getArticles(topic_name).then(({articles, total_count})=>{
            setArticlesListItems(articles)
            setIsLoading(false)
        })
    }, [topic_name])

  return isLoading ? <Loading/> : (
    <ul className='articles-list'>
        {articlesListItems.map((article)=>{
            return <ArticleCard key={article.article_id} article={article}/>
        })}
    </ul>
  )
}
