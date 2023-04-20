import { Link } from 'react-router-dom';
import Rating from './Rating.js';
const Product = (props) => {
  const { product } = props;
  return (
    <div className="card product  mb-3">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
        ></img>
      </Link>
      <div className="card-body">
        <Link
          to={`/product/${product.slug}`}
          className="link-secondary link-offset-2 link-underline link-underline-opacity-0"
        >
          <p className="card-title">{product.name}</p>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <p>
          <strong className="car-text">${product.price}</strong>
        </p>
        <button className="btn btn-dark">Add to cart</button>
      </div>
    </div>
  );
};

export default Product;
