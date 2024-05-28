import "./AddArticle.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function AddArticle() {
    const { register, handleSubmit } = useForm();
    const { currentUser } = useSelector(
        (state) => state.userAuthorLoginReducer // Ensure this matches your actual reducer name
    );
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Create axios instance with token
    const axiosWithToken = axios.create({
        headers: { Authorization: `Bearer ${token}` }
    });

    const postNewArticle = async (article) => {
        const formattedArticle = {
            articleid: Date.now(),
            title: article.title,
            category: article.category,
            content: article.content,
            dateofcreation: new Date().toISOString(),
            dateofmodification: new Date().toISOString(),
            username: currentUser.username,
            comments: [],
            status: true,
        };

        console.log("Posting article:", formattedArticle); // Debugging: log the formatted article data

        try {
            const res = await axiosWithToken.post('http://localhost:5000/author-api/article', formattedArticle);
            console.log("API Response:", res); // Debugging: log the API response
            if (res.data.message === 'New article created') {
                navigate(`/profile-author/articles-by-author/${currentUser.username}`);
            } else {
                setErr(res.data.message);
            }
        } catch (error) {
            setErr("An error occurred while creating the article.");
            console.error("API Error:", error); // Debugging: log the error
        }
    };

    return (
        <div className="container ">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-8 col-md-8 col-sm-10">
                    <div className="card shadow">
                        <div className="card-title text-center border-bottom">
                            <h2 className="p-3">Write an Article</h2>
                        </div>
                        <div className="card-body bg-light">
                            {err && <p className='text-danger fs-5'>{err}</p>}
                            <form onSubmit={handleSubmit(postNewArticle)}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        {...register("title")}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category" className="form-label">
                                        Select a category
                                    </label>
                                    <select
                                        {...register("category")}
                                        id="category"
                                        className="form-select"
                                    >
                                        <option value="programming">Programming</option>
                                        <option value="AI&ML">AI & ML</option>
                                        <option value="database">Database</option>
                                        <option value="web-development">Web Development</option>
  <option value="mobile-apps">Mobile Apps</option>
  <option value="cloud-computing">Cloud Computing</option>
  <option value="cybersecurity">Cybersecurity</option>
  <option value="blockchain">Blockchain</option>
  <option value="data-science">Data Science</option>
  <option value="machine-learning">Machine Learning</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="content" className="form-label">
                                        Content
                                    </label>
                                    <textarea
                                        {...register("content")}
                                        className="form-control"
                                        id="content"
                                        rows="10"
                                    ></textarea>
                                </div>

                                <div className="text-end">
                                    <button type="submit" className="text-light btn btn-primary">
                                        Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddArticle;
