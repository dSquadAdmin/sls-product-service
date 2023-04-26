import React from "react";
import { IProduct } from "../../types";

export const ProductDetail = (props: IProduct) => {
  const { name, description, price, imageUrl } = props;
  return (
    <div className="py-6 height">
      <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/3 bg-cover">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="w-2/3 p-4">
          <h1 className="text-gray-900 font-bold text-2xl">{name}</h1>
          <p className="mt-2 text-gray-600 text-sm h-1/4">{description}</p>
          <div className="flex item-center justify-between mt-3">
            <h1 className="text-gray-700 font-bold text-xl">${price}</h1>
            <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
              Add to Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
