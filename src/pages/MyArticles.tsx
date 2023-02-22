import React from 'react'
import NavBar from '../components/NavBar'
import '../style/my_articles.scss';
import { RxTriangleUp } from "react-icons/rx"
import { RxTriangleDown } from "react-icons/rx"

type Props = {}

const MyArticles: React.FC = () => {
  return (
    <>
     <NavBar />
    <div className="container">
      <div className="table-articles">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox"></input><div><RxTriangleUp /><RxTriangleDown /></div></th>
                <th>Article title</th>
                <th>Perex</th>
                <th>Author</th>
                <th># of comments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
      </div>
    </div>
    </>
  )
    
}

export default MyArticles