import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NavBar from '../components/NavBar'
import Article from '../components/Article'
import '../style/recent_articles.scss';

type Articles = {
  articleId: React.Key,
  title: string,
  perex: string,
  imageId: string,
  imageSrc: string,
  author: string,
  comments: number,
};

const RecentArticles = () => {
  const [articles, setArticles] = useState<Articles[]>([]);
  const [author, setAuthor] = useState<string>();  
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});
  
  useEffect(() => {
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

        console.log(response.data.items);
        



        setArticles(response.data.items)
      } catch (err) {

      }
    }



    getArticles();
  }, []);

  const getAuthor = async () => {
    try {
      const response = await axios.get(
        "https://fullstack.exercise.applifting.cz/tenants/680d4cfc-5775-4e09-9f50-46e2543a8ddd",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "82e81c5e-f47e-4566-ac95-a7f7fec32c62",
            Authorization: localStorage.getItem('access_token'),
          },
      
        }
      )
      setAuthor(response.data.name)

    } catch (err) {

    }
  }

  const getImage = async (imageId: string) => {
    
    try {
      const response = await axios.get(
        `https://fullstack.exercise.applifting.cz/images/${imageId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "82e81c5e-f47e-4566-ac95-a7f7fec32c62",
            Authorization: localStorage.getItem('access_token'),
          },
          responseType: 'blob',
        }
      )


      const localUrl = URL.createObjectURL(response.data);
      setImageData((prevData) => ({ ...prevData, [imageId]: localUrl }));
      
      
      
    } catch (err){

    }
  }

  console.log(imageData);
  

  useEffect(() => {
    getAuthor();
    articles.forEach((article) => {
      getImage(article.imageId);
    });
  }, [articles]);

  return (
    <>
      <NavBar />
      <main className="recent_articles">
        <h1> Recent articles</h1>
        {/* <Article articleId={''} title={''} perex={''} author={''} comments={0} /> */}

        {articles.length >= 1
          ? articles.map((article: { articleId: React.Key; title: string; perex: string; author: string; imageId: string; comments: number; }) => {
            return (
              <Article
                key={article.articleId}
                title={article.title}
                perex={article.perex}
                author={author}
                imageId={article.imageId}
                imageSrc={imageData[article.imageId]}
                articleId={article.articleId}
                comments={article.comments}
              />
            );
          })
          : null}
      </main>
    </>
  )
}

export default RecentArticles