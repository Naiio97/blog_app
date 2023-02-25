import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Login from './pages/Login'
import MyArticles from './pages/MyArticles'
import NewArticle from './pages/CreateArticle'
import RecentArticles from './pages/RecentArticles'

import ''

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RecentArticles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myArticles" element={<MyArticles />} />
        <Route path="/newArticle" element={<NewArticle />} />
      </Routes>
    </div>
  )
}

export default App
