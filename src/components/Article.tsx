import React from 'react';
import { Link } from 'react-router-dom';
import '../style/article.scss';

type Articles = {
  articleId: React.Key;
  title: string;
  perex: string;
  imageId: string;
  imageSrc: string;
  author: string | undefined;
  comments: number;
  createdAt: string;
};

const Article = (props: Articles) => {
  const { articleId, title, perex, imageSrc, author, comments, createdAt } =
    props;

  return (
    <div key={articleId} className="article-container">
      <img src={imageSrc}></img>
      <div className="info-box">
        <h2>{title}</h2>
        <span className="name-date">
          {author}&nbsp;&bull;&nbsp; {createdAt}
        </span>
        <p>{perex}</p>
        <div className="link-com">
          <Link style={{ textDecoration: 'none' }} to={`/article/${articleId}`}>
            Read whole article
          </Link>
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
};

export default Article;
