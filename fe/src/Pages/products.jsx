import CardProduct from "../components/Fragments/CardProduct";

const products = [
  {
    id: 1,
    name: "Sepatu Baru",
    price: "Rp.1.000.000",
    image: "/images/shoes1.jpg",
    description: `
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          sequi?`,
  },
  {
    id: 2,
    name: "Sepatu Lama",
    price: "Rp.500.000",
    image: "/images/shoes1.jpg",
    description: `
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          sequdsadsa?`,
  },
  {
    id: 3,
    name: "Sepatu NYA",
    price: "Rp.1.500.000",
    image: "/images/shoes1.jpg",
    description: `
          BGATAL APA-APA`,
  },
];

const ProductsPages = () => {
  return (
    <div className="flex justify-center py-5 ">
      {products.map((product) => (
        <CardProduct>
          <CardProduct.Header image={product.image} />
          <CardProduct.Body name={product.name}>
            {product.description}
          </CardProduct.Body>
          <CardProduct.Footer price={product.price} />
        </CardProduct>
      ))}
    </div>
  );
};
export default ProductsPages;
