import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import NavBar from '../components/NavBar'
import MyArticle from '../components/MyArticle';

import '../style/my_articles.scss';
import { RxTriangleUp } from "react-icons/rx"
import { RxTriangleDown } from "react-icons/rx"

type Articles = {
  articleId: React.Key;
  title: string;
  perex: string;
  author: string;
  comments: number;
};

const MyArticles = (props: Articles) => {
  const [articles, setArticles] = useState<Articles[]>([]);
  const [author, setAuthor] = useState<string>();
  const [numberOfComments, setNumberOfComments] = useState<number>();
  const [error, setError] = useState<string>();

  const getArticles = async () => {
    try {
      const response = await axios.get<{ items: Articles[] }>(
        "https://fullstack.exercise.applifting.cz/articles",
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "82e81c5e-f47e-4566-ac95-a7f7fec32c62",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setArticles(response.data.items)
    } catch (err) {

    }
  }

  const getAuthor = async () => {
    try {
      const response = await axios.get(
        "https://fullstack.exercise.applifting.cz/tenants/680d4cfc-5775-4e09-9f50-46e2543a8ddd",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "82e81c5e-f47e-4566-ac95-a7f7fec32c62",
          },
        }
      )

      setAuthor(response.data.name)

    } catch (err) {

    }
  }

  //TODO dodělat výpis konematářů

  const getComments = async (articleId: React.Key) => {
    try {
      const response = await axios.get(
        `https://fullstack.exercise.applifting.cz/articels/${articleId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "82e81c5e-f47e-4566-ac95-a7f7fec32c62",
            Authorization: localStorage.getItem('access_token'),
          }
        }
      )
      console.log(response.data.comments.length, 'aojd');
      
    } catch (err) {

    }


  }  
  useEffect(() => {
    getArticles();
    getAuthor()
    articles.forEach((article) => {
      getComments(article.articleId);
      console.log('sdas');
      
    });
  }, [])

  return (
    <>
      <NavBar />
      <div className="container">
        <div className='header'>
          <h1>My Articles</h1>
          <Link to={'/CreateArticle'}>Create new article</Link>
        </div>

        <div className="table-articles">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Article title<RxTriangleUp className='up' /><RxTriangleDown className='down' /></th>
                <th>Perex<RxTriangleUp className='up' /><RxTriangleDown className='down' /></th>
                <th>Author<RxTriangleUp className='up' /><RxTriangleDown className='down' /></th>
                <th># of comments<RxTriangleUp className='up' /><RxTriangleDown className='down' /></th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.length >= 1
                ? articles.map((article: { articleId: React.Key; title: string; perex: string; author: string; comments: number; }) => {
                  return (
                    <MyArticle
                      key={article.articleId}
                      title={article.title}
                      perex={article.perex}
                      author={author}
                      articleId={article.articleId}
                      comments={article.comments}
                    />
                  );
                })
                : null
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )

}

export default MyArticles