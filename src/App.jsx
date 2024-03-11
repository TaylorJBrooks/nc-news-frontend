import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header, Home, SingleArticle } from './components'

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/articles/:article_id' element={<SingleArticle/>}/>
    </Routes>
    </>
  )
}

export default App
