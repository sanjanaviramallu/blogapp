import "./home.css";
import 'bootstrap/dist/css/bootstrap.css';

function Home() {
  return (
    <div className='articleHome'>
      <h1 className="h1" style={{color:'var(--crimson)'}}> Blog App</h1>
      <img className="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDgi6uCac_rlau1Q_pGchGtIgN7krc9-ltHw&s" alt=""/>
      <p className="lead">
      The blog app is a web application designed to facilitate the creation, publishing, and management of blog posts. It allows users to register, log in, and create personalized accounts. Authors can write articles, categorize them, and add tags for easy searchability. Users can browse articles, read content, and engage through comments. The app often incorporates features such as user authentication, authorization, and profile management. Advanced functionalities may include social sharing, email notifications, and multimedia support for images and videos. Additionally, blog apps may offer analytics tools for authors to track readership and engagement metrics. Overall, these applications empower individuals and organizations to share ideas, insights, and stories with a global audience.
      </p>
    </div>
  );
}

export default Home;