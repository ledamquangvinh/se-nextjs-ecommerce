"use-client"

import { CartProductType, SelectedImgType } from "@/app/product/[productId]/ProductDetail";
import React from "react";

interface SetColorProp {
  images: SelectedImgType[],
  cartProduct: CartProductType,
  handleColorSelect: (value: SelectedImgType) => void
}
const SetColor : React.FC<SetColorProp> = ({images, cartProduct, handleColorSelect}) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR:</span>
        <div className="flex gap-1">{
          images.map((image) => {
            return (
              <div key={image.color} onClick={() => handleColorSelect(image)} className={`
              h-7
              w-7
              rounded-full
            border-teal-300 
              flex items-center 
              justify-center 
              ${
                cartProduct.selectedImg.color === image.color 
                ? "border-[1.5px]" 
                : "border-none"
              }
              `}
              >
                <div style={{background:image.colorCode}} className="h-5 w-5 rounded-full border-[1.2px] border-slate"></div>
              </div>
            )
          })
          }</div>
      </div>
    </div>
  );
}
 
export default SetColor;