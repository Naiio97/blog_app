import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import MyArticles from './pages/MyArticles'
import FormArticle from './pages/FormArticle'
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
        <Route path="/editArticle" element={<FormArticle />} />
        <Route path="/editArticle/:idArticle" element={<FormArticle/>} />
        <Route path="/article/:id" element={<DetailArticle />} />
      </Routes>
    </div>
  )
}

export default App
