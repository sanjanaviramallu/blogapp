import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

function AuthorProfile() {
  const { currentUser } = useSelector(state => {
    console.log(state); // Debugging the state structure
    return state.userAuthorLoginReducer;
  });

  return (
    <div className="author-profile p-3">
      <ul className="nav justify-content-around fs-3">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`articles-by-author/${currentUser.username}`}
            style={{ color: "var(--dark-green)" }}
          >
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="add-article"
            style={{ color: "var(--dark-green)" }}
          >
            Add new
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default AuthorProfile;
