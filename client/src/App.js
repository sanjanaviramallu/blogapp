import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import './App.css';
import RootLayout from './Rootlayout'
import {lazy, Suspense} from 'react'
import Home from './components/home/home';
import Signup from './components/signup/signup';
import Signin from './components/signin/signin';
import UserProfile from './components/profile-user/profileuser';
import AuthorProfile from './components/profile-author/profileauthor';
import Articles from './components/articles/Articles';
import ErrorPage from './components/ErrorPage';


//import AddArticle from './components/add-article/AddArticle';
import ArticlesByAuthor from './components/articles-by-author/ArticlesByAuthor';
import Article from './components/article/Article';
//dynamic import of Articles
//const Articles=lazy(()=>import('./components/articles/Articles'))
const AddArticle=lazy(()=>import('./components/add-article/AddArticle'))
function App() {

  const browserRouter=createBrowserRouter([{
    path:'',
    element:<RootLayout />,
    errorElement:<ErrorPage/>,

    children:[
      {
        path:'',
        element:<Home />
      },
      {
        path:'/signup',
        element:<Signup />
      },
      {
        path:"/signin",
        element:<Signin />
      },
      {
        path:"/profile-user",
        element:<UserProfile />,
        children:[
          {
            path:"articles",
            element:<Articles />
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:'',
            element:<Navigate to='articles' />
          }
        ]
      },
      {
        path:"/profile-author",
        element:<AuthorProfile />,
        children:[
          {
            path:'add-article',
            element:<Suspense fallback="loading..."><AddArticle /></Suspense> 
          },
          {
            path:'articles-by-author/:author',
            element:<ArticlesByAuthor />,
           
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:'',
            element:<Navigate to='articles-by-author/:author' />
          }
        ]
      }
    ]
  }])

  return (
    <div className='bg'>
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;