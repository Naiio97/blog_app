import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import MyArticles from './pages/MyArticles'
import NewArticle from './pages/CreateArticle'
import RecentArticles from './pages/RecentArticles'
import DetailArticle from './pages/DetailArticle'

import './style/app.scss'

function App(): JSX.Element {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RecentArticles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myArticles" element={<MyArticles/>} />
        <Route path="/newArticle" element={<NewArticle />} />
        <Route path="/article/:id" element={<DetailArticle />} />
      </Routes>
    </div>
  )
}

export default App
