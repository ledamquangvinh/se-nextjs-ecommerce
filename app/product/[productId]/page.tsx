import Container from "@/app/components/Container";
import { product } from "@/utils/product"
import ProductDetail from "./ProductDetail";
import ListRating from "./ListRating";
interface IParams {
  productId? : string
}

const Product = ({params} :{params: IParams}) => {
  console.log("param", params)

  return ( 
   <div className="p-8">
    <Container >
      <ProductDetail product = {product}/>
      <div className="flex flex-col mt-20 gap-4">
        <div>Add Rating</div>
        <div>
          <ListRating product={product}/>
        </div>
      </div>
    </Container>
   </div>
  );
}
 
export default Product;