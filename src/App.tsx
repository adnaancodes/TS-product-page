import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Loader from "./components/Loader";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: number;
}
function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios("https://fakestoreapi.com/products")
      .then(({ data }: { data: Product[] }) => {
        if (data) {
          setIsLoading(false);
          setProducts(
            data.map(
              ({ id, title, price, description, category, image, rating }) => ({
                id,
                title,
                price,
                description,
                category,
                image,
              })
            )
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
    return () => {
      setProducts([]);
    };
  }, []);

  if (isLoading)
    return (
      <div>
        <h1 className="header">Product Store</h1>
        <Loader />
      </div>
    );
  if (Error) return <h1>{Error}</h1>;

  return (
    <div>
      <h1 className="header">Product Store</h1>
      <div className="products">
        {products.map(({ id, title, price, description, category, image }) => (
          <div className="product" key={id}>
            <img src={image} alt="product image" />
            <p>{title}</p>
            <h2>${price}</h2>
            {/* <p>{rating} </p> */}
            <p>{category}</p>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
