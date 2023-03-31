import React from 'react'
import '../style/article.scss'

type Articles = {
  articleId: React.Key,
  title: string,
  perex: string,
  imageId: string,
  imageSrc: string,
  author: string | undefined,
  comments: number
};

const Article = (props: Articles) => {

  const { articleId, title, perex, imageSrc, author, comments } = props;

  return (

    <div key={articleId} className="article-container">
      <img src={imageSrc}></img>
      <div className="info-box">
        <h2>{title}</h2>
        <span className="name-date">{author}&nbsp;&bull;&nbsp; 26.3.2023</span>
        <p>{perex}
        </p>
        <div className='link-com'>
          <a>Read whole article</a> 
          <span>{comments}</span>
        </div>
      </div>
    </div>
  )
};

export default Article;