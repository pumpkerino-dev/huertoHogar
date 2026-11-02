
import { Link } from 'react-router-dom';

function BlogCard({ article }) {
    return (
        <article className="article-card">

            <Link to={article.href}>
                <div className="article-img-wrapper">
                    <img
                        src={article.image}
                        alt={article.alt}
                    />
                </div>
            </Link>

            <div className="article-content">

                <span className="blog-badge">
                    {article.category}
                </span>

                <h3 className="article-title">
                    <Link to={article.href}>
                        {article.title}
                    </Link>
                </h3>

                <p className="article-excerpt">
                    {article.excerpt}
                </p>

            </div>

        </article>
    );
}

export default BlogCard;
