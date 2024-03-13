import React, { useEffect, useState } from 'react'
import { getArticles } from '../../api'
import ArticleCard from './ArticleCard'
import Loading from './Loading'
import { useParams } from 'react-router-dom'

export default function ArticlesList() {
    const [articlesListItems, setArticlesListItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {topic_name} = useParams()
    const [selectedSortBy, setSelectedSortBy] = useState('mostRecent')

    const mostRecent = {sortBy: 'created_at', orderBy: 'desc'};
    const oldest = {sortBy: 'created_at', orderBy: 'asc'};
    const votesDesc = {sortBy: 'votes', orderBy: 'desc'};
    const votesAsc = {sortBy: 'votes', orderBy: 'asc'};
    const commentsDesc = {sortBy: 'comment_count', orderBy: 'desc'}
    const commentsAsc = {sortBy: 'comment_count', orderBy: 'asc'}
    const sortingSelection = {mostRecent, oldest, votesDesc, votesAsc, commentsDesc, commentsAsc}

    useEffect(()=>{
        const order = sortingSelection[selectedSortBy].orderBy
        const sort = sortingSelection[selectedSortBy].sortBy
        setIsLoading(true)
        getArticles(order, sort, topic_name).then(({articles, total_count})=>{
            setArticlesListItems(articles)
            setIsLoading(false)
        })
    }, [topic_name, selectedSortBy])

  return isLoading ? <Loading/> : (
    <>
    <label>Sort By:
    <select className="dropdown" name="sort-by-dropdown" value={selectedSortBy} onChange={(e)=> setSelectedSortBy(e.target.value)}>
        <option value='mostRecent'>Most recent</option>
        <option value='oldest'>Oldest</option>
        <option value='votesDesc'>Votes high to low</option>
        <option value='votesAsc'>Votes low to high</option>
        <option value='commentsDesc'>Comments high to low</option>
        <option value='commentsAsc'>Comments low to high</option>
    </select></label>
    <ul className='articles-list'>
        {articlesListItems.map((article)=>{
            return <ArticleCard key={article.article_id} article={article}/>
        })}
    </ul>
    </>
  )
}
