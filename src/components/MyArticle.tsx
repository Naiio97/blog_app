import React from 'react'

import '../style/my_article.scss';
import { FiEdit2 } from "react-icons/fi"
import { AiOutlineDelete } from "react-icons/ai"



type Props = {
    articleId: React.Key,
    title: string,
    perex: string,
    author: string,
    comments: number

}

const MyArticle = (props: Props) => {
    return (
        <>
            <tr key={props.articleId}>
                <td>{props.title}</td>
                <td>{props.perex}</td>
                <td>{props.author}</td>
                <td>{props.comments}</td>
                <td>

                    <a>
                        <FiEdit2 />
                    </a>
                    <AiOutlineDelete />


                </td>
            </tr>
        </>

    )
}

export default MyArticle