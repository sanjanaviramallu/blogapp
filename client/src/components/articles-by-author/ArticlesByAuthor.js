import axios from "axios";
import { axiosWithToken } from '../../axiosWithToken';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ArticlesByAuthor.css";
import { useNavigate, Outlet } from "react-router-dom";

function ArticlesByAuthor() {
  const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();

  // Make sure the state name matches the reducer name in your store
  let { currentUser } = useSelector(state => state.userAuthorLoginReducer);

  // Function to get articles of the current author
  const getArticlesOfCurrentAuthor = async () => {
    try {
      let res = await axiosWithToken.get(`http://localhost:5000/author-api/article/${currentUser.username}`);
      console.log('API Response:', res);
      if (res.data.payload) {
        setArticlesList(res.data.payload);
      } else {
        console.error('No payload in response', res);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  // Function to navigate to article details
  const readArticleByArticleId = (articleObj) => {
    navigate(`../article/${articleObj.articleId}`, { state: articleObj });
  }

  // Fetch articles on component mount
  useEffect(() => {
    if (currentUser.username) {
      getArticlesOfCurrentAuthor();
    }
  }, [currentUser.username]);

  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
        {articlesList.map((article) => (
          <div className="col" key={article.articleId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.content.substring(0, 80) + "...."}
                </p>
                <button className="custom-btn btn-4" onClick={() => readArticleByArticleId(article)}>
                  <span>Read More</span>
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Last updated on {article.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default ArticlesByAuthor;
