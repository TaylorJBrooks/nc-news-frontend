import React, { useEffect, useState } from 'react'
import { getArticles } from '../../api'
import ArticleCard from './ArticleCard'
import Loading from './Loading'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ErrorPage from './ErrorPage'

export default function ArticlesList() {
    const [articlesListItems, setArticlesListItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { topic_name } = useParams()
    const [ searchParams ] = useSearchParams()
    const [selectedSortBy, setSelectedSortBy] = useState('sort=created_at&order=desc')
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);

    useEffect(()=>{
        const order = searchParams.get('order') || 'desc'
        const sort = searchParams.get('sort') || 'created_at'
        setIsLoading(true)
        getArticles(order, sort, topic_name).then(({articles, total_count})=>{
            setArticlesListItems(articles)
            setSelectedSortBy(`sort=${sort}&order=${order}`)
            setIsLoading(false)
            setError(null)
        }).catch((err)=>{
            setError({err})
        })
    }, [topic_name, location])

    function handleSelection(e){
        if (topic_name){
            navigate(`/topics/${topic_name}?${e.target.value}`)
        } else {
            navigate(`/?${e.target.value}`)
        }
    }

    if(error) {
        return <ErrorPage error={error.err.response}/>
    }

  return isLoading ? <Loading/> : (
    <>
    <label>Sort By:
    <select className="dropdown" name="sort-by-dropdown" value={selectedSortBy} onChange={(e)=> handleSelection(e)}>
        <option value='sort=created_at&order=desc'>Most recent</option>
        <option value='sort=created_at&order=asc'>Oldest</option>
        <option value='sort=votes&order=desc'>Votes high to low</option>
        <option value='sort=votes&order=asc'>Votes low to high</option>
        <option value='sort=comment_count&order=desc'>Comments high to low</option>
        <option value='sort=comment_count&order=asc'>Comments low to high</option>
    </select></label>
    <ul className='articles-list'>
        {articlesListItems.map((article)=>{
            return <ArticleCard key={article.article_id} article={article}/>
        })}
    </ul>
    </>
  )
}
