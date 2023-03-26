import React, { useEffect, useState } from 'react'
import '../style/my_article.scss';
import { FiEdit2 } from "react-icons/fi"
import { AiOutlineDelete } from "react-icons/ai"



type Props = {
    articleId: React.Key,
    title: string,
    perex: string,
    author: string|undefined,
    comments: number,
    handleDeleteArticle: (articleId: React.Key) => void,
}



const MyArticle = (props: Props) => {

    const { articleId, title, perex, author, comments, handleDeleteArticle } = props;

    const handleDelete = () => {
        handleDeleteArticle(articleId)
    }

    return (
        <>
            <tr key={articleId}>
                <td><input type="checkbox"></input></td>
                <td>{title}</td>
                <td>{perex}</td>
                <td>{author}</td>
                <td>{comments}</td>
                <td>
                    <div className="action-icons">
                        <a><FiEdit2 className="edit-icon" /></a>  
                        <span onClick={() => handleDelete()}><AiOutlineDelete /></span>
                    </div>
                </td>
            </tr>
        </>

    )
}

export default MyArticle