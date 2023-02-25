                <th>Action</th>
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NavBar from '../components/NavBar'
import MyArticle from '../components/MyArticle';

import '../style/my_articles.scss';
import { RxTriangleUp } from "react-icons/rx"
import { RxTriangleDown } from "react-icons/rx"

type Props = {}

const MyArticles = (props: Props) => {
  const [articles, setArticles] = useState<Array<any>>([]);
  const [error, setError] = useState<string>();

  const getArticles = async () => {
    try {
      const response = await axios.get(
        "https://fullstack.exercise.applifting.cz/articles",
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "82e81c5e-f47e-4566-ac95-a7f7fec32c62",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const a = await response.data.items;

      setArticles(a)
    } catch (err) {

    }
  }

  useEffect(() => {
    getArticles();
  }, [])

  console.log(articles);



  return (
    <>
      <NavBar />
      <div className="container">
        <div className="table-articles">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox"></input><RxTriangleUp /><RxTriangleDown /></th>
                <th>Article title<RxTriangleUp /><RxTriangleDown /></th>
                <th>Perex<RxTriangleUp /><RxTriangleDown /></th>
                <th>Author<RxTriangleUp /><RxTriangleDown /></th>
                <th># of comments<RxTriangleUp /><RxTriangleDown /></th>
                <th>Action<RxTriangleUp /><RxTriangleDown /></th>
              </tr>
            </thead>
            <tbody>
              {articles.length >= 1
                ? articles.map((article: { articleId: React.Key; title: any; perex: any; author: any; comments: any; }) => {
                  return (
                    <MyArticle
                      key={article.articleId}
                      title={article.title}
                      perex={article.perex}
                      author={article.author}
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