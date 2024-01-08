import Container from "@/app/components/Container";
import { product } from "@/utils/product"
import ProductDetail from "./ProductDetail";
interface IParams {
  productId? : string
}

const Product = ({params} :{params: IParams}) => {
  console.log("param", params)

  return ( 
   <div className="p-8">
    <Container >
      <ProductDetail product = {product}>

      </ProductDetail>
    </Container>
   </div>
  );
}
 
export default Product;