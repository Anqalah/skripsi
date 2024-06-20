import CardProduct from "../components/Fragments/CardProduct";
const ProductsPages = () => {
  return (
    <div className="flex justify-center py-3 ">
      <CardProduct>
        <CardProduct.Header image="/images/shoes1.jpg" />
        <CardProduct.Body title="Sepatu Baru">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          sequi, dolor commodi non perspiciatis nisi alias incidunt obcaecati
          nulla dolorum ad temporibus sed laudantium minima porro aspernatur
          necessitatibus. Culpa, laborum?
        </CardProduct.Body>
        <CardProduct.Footer price="Rp.1.000.000" />
      </CardProduct>

      <CardProduct>
        <CardProduct.Header image="/images/shoes1.jpg" />
        <CardProduct.Body title="Sepatu Baru">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          sequi, dolor commodi non perspiciatis nisi alias incidunt obcaecati
          nulla dolorum ad temporibus sed laudantium minima porro aspernatur
          necessitatibus. Culpa, laborum?
        </CardProduct.Body>
        <CardProduct.Footer price="Rp.1.000.000" />
      </CardProduct>

      <CardProduct>
        <CardProduct.Header image="/images/shoes1.jpg" />
        <CardProduct.Body title="Sepatu Baru">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          sequi, dolor commodi non perspiciatis nisi alias incidunt obcaecati
          nulla dolorum ad temporibus sed laudantium minima porro aspernatur
          necessitatibus. Culpa, laborum?
        </CardProduct.Body>
        <CardProduct.Footer price="Rp.1.000.000" />
      </CardProduct>
    </div>
  );
};
export default ProductsPages;
