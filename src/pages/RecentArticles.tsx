import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Article from '../components/Article';
import '../style/recent_articles.scss';
import moment from 'moment';

type Articles = {
  articleId: React.Key;
  title: string;
  perex: string;
  imageId: string;
  imageSrc: string;
  author: string;
  comments: number;
  createdAt: string;
};

const RecentArticles = () => {
  const [articles, setArticles] = useState<Articles[]>([]);
  const [author, setAuthor] = useState<string>();
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axios.get<{ items: Articles[] }>(
          'https://fullstack.exercise.applifting.cz/articles',
          {
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': 'bc3f9b9d-31d8-4b64-acb8-6476f166653c',
              Authorization: localStorage.getItem('token'),
            },
          }
        );

        setArticles(response.data.items);
        setArticles(
          response.data.items.map((item: Articles) => ({
            ...item,
            createdAt: moment(item.createdAt).format('DD.MM.YYYY'),
          }))
        );
      } catch (err: any) {
        console.log(err);
      }
    };
    getArticles();
  }, []);

  const getAuthor = async () => {
    try {
      const response = await axios.get(
        'https://fullstack.exercise.applifting.cz/tenants/680d4cfc-5775-4e09-9f50-46e2543a8ddd',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'bc3f9b9d-31d8-4b64-acb8-6476f166653c',
            Authorization: localStorage.getItem('access_token'),
          },
        }
      );
      setAuthor(response.data.name);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getImage = async (imageId: string) => {
    try {
      const response = await axios.get(
        `https://fullstack.exercise.applifting.cz/images/${imageId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'bc3f9b9d-31d8-4b64-acb8-6476f166653c',
            Authorization: localStorage.getItem('access_token'),
          },
          responseType: 'blob',
        }
      );

      const localUrl = URL.createObjectURL(response.data);
      setImageData((prevData) => ({ ...prevData, [imageId]: localUrl }));
    } catch (err: any) {
      console.log(err);
    }
  };

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

        {articles.length >= 1
          ? articles.map(
              (article: {
                articleId: React.Key;
                title: string;
                perex: string;
                author: string;
                imageId: string;
                comments: number;
                createdAt: string;
              }) => {
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
                    createdAt={article.createdAt}
                  />
                );
              }
            )
          : null}
      </main>
    </>
  );
};

export default RecentArticles;
