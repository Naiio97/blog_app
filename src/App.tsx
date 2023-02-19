import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Login from './pages/Login'
import MyArticle from './pages/MyArticle'
import NewArticle from './pages/CreateArticle'
import RecentArticles from './pages/RecentArticles'

function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<RecentArticles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myArticle" element={<MyArticle />} />
        <Route path="/newArticle" element={<NewArticle />} />
      </Routes>
    </div>
  )
}

export default App
