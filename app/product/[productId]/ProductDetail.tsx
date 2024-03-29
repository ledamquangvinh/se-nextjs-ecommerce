"use client"

import Button from "@/app/components/products/Button";
import ProductImage from "@/app/components/products/ProductImages";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheck, MdCheckCircle } from "react-icons/md";

interface ProductDetailProps {
  product: any
}

export type CartProductType = {
  id: string,
  name: string,
  description: string,
  category: string,
  brand: string,
  selectedImg: SelectedImgType,
  quantity: number,
  price: number
}

export type SelectedImgType = {
  color: string,
  colorCode: string,
  image: string
}

const Horizontal = () => {
  return <hr className="w-[30% my-2]"></hr>
}

const ProductDetail : React.FC<ProductDetailProps> = ({ product }) => {
  const {handleAddProductToCart, cartProducts} = useCart()
  const [isProductInCart, setIsProductInCart] = useState(false)
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: {...product.images[0]},
    quantity: 1,
    price: product.price
  })
  const router = useRouter()

  const productRating = product.reviews.reduce((acc: any, item: any) => item.rating + acc, 0) / product.reviews.length

  useEffect(() => {
    setIsProductInCart(false)
    console.log(cartProduct)
    if (cartProducts) 
    {
      const exitstingIndex = cartProducts.findIndex((item) => item.id === product.id)
      
      if (exitstingIndex > -1) {
        setIsProductInCart(true)
      }
    }
    
  }, [cartProducts])

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => {
      return {...prev, selectedImg: value}
    })
  }, [cartProduct.selectedImg])

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return
    }
    setCartProduct((prev) => {
      return{...prev, quantity: prev.quantity + 1}
    })
  }, [cartProduct])

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return
    }
    setCartProduct((prev) => {
      return {...prev, quantity: prev.quantity - 1}
    })
  }, [cartProduct])


  return ( 
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect}>

    </ProductImage>
    <div className="flex flex-col gap-1 text-slate-500 text-sm">
      <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
      <div className="flex items-center gap-2">
        <Rating value={productRating} readOnly />
        <div>{product.reviews.length} reviews</div>
      </div>
      <Horizontal/>
      <div className="text-justify">{product.description}</div>
      <Horizontal />
      <div>
        <span className="font-semibold ">Category: {product.category} </span> 
      </div>
      <div>
        <span className="font-semibold">Brand: {product.brand} </span> 
      </div>
      <div>
        <span className={product.inStock ? "text-teal-400" : "text-rose-400"}>{product.inStock ? "In Stock" : "Out of Stock"}</span>
      </div>
      <Horizontal/>
      {
        isProductInCart 
        ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20}/>
              <span>Product added to cart</span>
            </p> 
            <div>
              <Button label="View Cart" outline onClick={() => {
                router.push('/cart')
              }}>
              </Button>
            </div>
          </>

        ) : (
          <>
            <SetColor 
              cartProduct={cartProduct} 
              images={product.images} 
              handleColorSelect={handleColorSelect}
            />
            <Horizontal/>
            <SetQuantity 
              cartProduct={cartProduct} 
              handleQtyDecrease={handleQtyDecrease} 
              handleQtyIncrease={handleQtyIncrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button label="Add To Cart" onClick={() => handleAddProductToCart(cartProduct)}/>
            </div>
          </>
        )
      }
    </div>
  </div> 
  );
}
 
export default ProductDetail;