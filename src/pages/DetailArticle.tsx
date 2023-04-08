import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import moment from "moment";
import axios from 'axios';
import NavBar from '../components/NavBar'

import '../style/detail_article.scss'

type Props = {}


type SideArticle = {
    articleId: React.Key,
    title: string;
    perex: string;
};

const DetailArticle = (props: Props) => {
    const { id } = useParams();
    const [sideArticles, setSideArticles] = useState<SideArticle[]>([]);
    const [articleId, setArticleId] = useState<string>('');
    const [articleTitle, setArticleTitle] = useState<string>('');
    const [articleContent, setArticleContent] = useState<string>('');
    const [articleDate, setArticleDate] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [imageId, setImageId] = useState<null>(null);
    const [images, setImages] = useState<string[]>([]);



    const getDetailArticle = async () => {    
        try {
            const response = await axios.get(
                `https://fullstack.exercise.applifting.cz/articles/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": "82e81c5e-f47e-4566-ac95-a7f7fec32c62",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            const date = moment(response.data.createdAt).format("D.M.YYYY");        

            setArticleId(response.data.articleId)
            setArticleTitle(response.data.title);
            setArticleContent(response.data.content);
            setArticleDate(date);
            setImageId(response.data.imageId)
            
        } catch (err) {

        }
    }

    

    const getImage = async (imageId: string | null) => {
        if (imageId) {
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
                setImages((prevData) => [...prevData, localUrl]);

            } catch (err) {

            }
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
                        Authorization: localStorage.getItem('access_token'),
                    },

                }
            )
            setAuthor(response.data.name)

        } catch (err) {

        }
    }

    const getSideArticles = async () => {
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

            setSideArticles(response.data.items.map((item: { title: string | any[]; perex: string | any[]; }) => ({
                ...item,
                perex: `${item.perex.slice(0,180)}...`,
            })));

        } catch (err) {

        }

    }


    useEffect(() => {
        getSideArticles();
        getDetailArticle();
        getAuthor();
        getImage(imageId);
    }, [imageId]);

    return (
        <>
            <NavBar />
            <main className='detail-article'>
                <section className='section'>
                    <article className="article">
                        <div key={articleId}>
                            <h1>{articleTitle}</h1>
                            <span>{author}&nbsp;&bull;&nbsp; {articleDate}</span>
                            {images.map((image) => (
                                <img key={image} src={image}></img>
                            ))}
                            <p>{articleContent}</p>
                        </div>
                    </article>
                    <div className='vertical-bar'></div>
                    <aside className="aside">
                        <h2>Releated articles</h2>
                        {sideArticles.map((sideArticle) => {
                            if (sideArticle.articleId === id) {
                                return false;
                            }
                            return (
                                <div key={sideArticle.articleId}>
                                    <h3>{sideArticle.title}</h3>
                                    <p>{sideArticle.perex}</p>
                                </div>
                            );
                        })}
                    </aside>
                </section>
                <section className="comments-container">
                    <div className='horizontal-bar'></div>
                    <div>
                        <h2>Comments (0)</h2>
                        <form>
                            <div className='input'>
                                <input type="text"
                                        id="comment_text"
                                        required
                                        placeholder='Join the discussion'
                                        // onChange={(e) => setCommentContent(e.target.value)}
                                        maxLength={1000}
                                />
                            </div>
                            <button type='submit'>Add comment</button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default DetailArticle