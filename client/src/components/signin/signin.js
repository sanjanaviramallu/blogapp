import React, { useEffect } from "react";
import "./signin.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { userAuthorLoginThunk } from "../../redux/slices/userAuthorSlice";
import { useNavigate, Link } from "react-router-dom"; // Import Link

function Signin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { isPending, currentUser, loginUserStatus, errorOccurred, errMsg } =
        useSelector((state) => state.userAuthorLogin); // Ensure this matches your store configuration
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSignUpFormSubmit(userCred) {
        dispatch(userAuthorLoginThunk(userCred));
    }

    useEffect(() => {
        if (loginUserStatus) {
            if (currentUser.userType === "user") {
                navigate("/profile-user");
            }
            if (currentUser.userType === "author") {
                navigate("/profile-author");
            }
        }
    }, [loginUserStatus, navigate, currentUser]);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="card shadow">
                        <div className="card-title text-center border-bottom">
                            <h2 className="form-label">Signin</h2>
                        </div>
                        <div className="card-body">
                            {/* invalid cred err */}
                            {errorOccurred && (
                                <p className="text-center" style={{ color: "var(--crimson)" }}>
                                    {errMsg}
                                </p>
                            )}
                            <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                                {/* radio */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="user"
                                        className="form-check-label me-3"
                                        style={{ fontSize: "1.2rem", color: "var(--light-dark-grey)" }}
                                    >
                                        Login as
                                    </label>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="author"
                                            value="author"
                                            {...register("userType")}
                                        />
                                        <label htmlFor="author" className="form-check-label">
                                            Author
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="user"
                                            value="user"
                                            {...register("userType")}
                                        />
                                        <label htmlFor="user" className="form-check-label">
                                            User
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        {...register("username")}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        {...register("password")}
                                    />
                                </div>

                                <div className="text-end">
                                    <button type="submit" className="btn">
                                        Login
                                    </button>
                                </div>
                            </form>
                            {/* Register link */}
                            <div className="text-center mt-3">
                                <p>
                                    Not yet registered?{" "}
                                    <Link to="/signup">Register now</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
