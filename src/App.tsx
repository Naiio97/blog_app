import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import MyArticles from './pages/MyArticles'
import NewArticle from './pages/CreateArticle'
import RecentArticles from './pages/RecentArticles'

import './style/app.scss'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RecentArticles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myArticles" element={<MyArticles articleId={''} title={''} perex={''} author={''} comments={0} />} />
        <Route path="/newArticle" element={<NewArticle />} />
      </Routes>
    </div>
  )
}

export default App
