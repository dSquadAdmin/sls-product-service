import React from "react";
import { IProduct } from "../../types";
import { Loader } from "../UiComponents/Loader";
import { ProductForm } from "./productForm";

interface IProps {
  loading: boolean;
  token: string;
  data: Array<IProduct>;
  prevRecords: () => void;
  nextRecords: () => void;
  onChangeLimit: (limit: number) => void;
}

export const ProductTable = (props: IProps) => {
  const { loading, data, prevRecords, nextRecords, onChangeLimit, token } =
    props;
  const [addProduct, setAddProduct] = React.useState<boolean>(false);

  return (
    <div className="relative overflow-x-auto mt-3">
      <div className="flex items-center justify-between p-6">
        <div className="block">
          <button
            onClick={()=>setAddProduct(true)}
            className="px-3 py-2 bg-blue-800 text-white text-xs font-bold uppercase rounded">
            Add Product
          </button>
        </div>
        <div className="flex">
          <select
            id="countries"
            onChange={(ev) => onChangeLimit(parseInt(ev.target.value))}
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="25" selected>
              25
            </option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <button
            className="px-3 py-2 bg-gray-500 text-white ml-5 text-xs font-bold uppercase rounded"
            type="button"
            disabled={loading}
            onClick={() => prevRecords()}
          >
            Prev
          </button>
          <button
            className="px-3 py-2 bg-gray-500 text-white ml-3 text-xs font-bold uppercase rounded"
            type="button"
            disabled={loading}
            onClick={() => nextRecords()}
          >
            Next
          </button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr className="bg-white border-b">
                <td className="px-6 py-4>">{d.name}</td>
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {d.description}
                </td>
                <td className="px-6 py-4>">${d.price}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      console.log(d.id);
                    }}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Red
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ProductForm
        show={addProduct}
        token={token}
        closeForm={() => {
          setAddProduct(false);
        }}
      />
    </div>
  );
};
