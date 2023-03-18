import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../style/my_article.scss';
import { FiEdit2 } from "react-icons/fi"
import { AiOutlineDelete } from "react-icons/ai"



type Props = {
    articleId: React.Key,
    title: string,
    perex: string,
    author: string|undefined,
    comments: number

}


const MyArticle = (props: Props) => {

    const hendleDeleteArticle = async (articleId: React.Key) => {
        try {
            const response = await axios.delete(
                `https://fullstack.exercise.applifting.cz/articles/${articleId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": "82e81c5e-f47e-4566-ac95-a7f7fec32c62",
                        Authorization: localStorage.getItem('access_token'),
                    }
                })

        
                
        } catch (err) {

        }
    }

    useEffect(() => {
        hendleDeleteArticle()
    })

    return (
        <>
            <tr key={props.articleId}>
                <td><input type="checkbox"></input></td>
                <td>{props.title}</td>
                <td>{props.perex}</td>
                <td>{props.author}</td>
                <td>{props.comments}</td>
                <td>
                    <div className="action-icons">
                        <a><FiEdit2 /></a>  
                        <span onClick={() => hendleDeleteArticle(props.articleId)}><AiOutlineDelete /></span>
                    </div>
                    

                </td>
            </tr>
        </>

    )
}

export default MyArticle