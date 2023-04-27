import React, { useCallback } from "react";
import Sidebar from "../UiComponents/Sidebar";
import ContentArea from "./contentArea";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../reducers/auth";
import { AppState } from "../../store";
import { deleteProduct, loadedProducts, loadingProducts, saveProducts } from "../../reducers/product";
import * as API from "../../api";
import { Alert } from "../UiComponents/Alert";
import { ProductTable } from "../Product";

interface IProps {
  token: string;
}

const DashBoard = (props: IProps) => {
  const dispatch = useDispatch();
  const {data,loading, limit: numPerPage, fromIndex } = useSelector((state: AppState) => state.product);
  const [errors, setErrors] = React.useState<any>({});

  const logOutUser = () => {
    dispatch(logOut());
  };

  const fetchData = useCallback((from: number, limit: number, forward: boolean) => {
    dispatch(loadingProducts());
    API.getProducts({fromIndex: from, limit, forward }, props.token)
      .then((result)=>{
        const { data } = result.data;
        if (data.products.length > 0){
          dispatch(saveProducts({
            data,
            fromIndex: from,
            limit: limit,
          }))
        }
        dispatch(loadedProducts());
      }).catch(error=>{
        let message = "Unable to fetch products!";
        if (error.response && error.response.status ===403 ) {
          message = "auth token is invalid."
        }
        setErrors({"err": message});
      }).finally(()=>dispatch(loadedProducts()));
  }, [dispatch, props.token]);

  React.useEffect(() => {
    if (!loading && data.length < 1){
      fetchData(new Date().getTime(), numPerPage, false);
    }
  }, []);
  

  return (
    <div className="flex bg-gray-100">
      <Sidebar title="Dashboard">
        <li className="rounded-sm">
          <button className="flex items-center p-2 space-x-3 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span>Products</span>
          </button>
        </li>
        <li className="rounded-sm">
          <button
            onClick={() => logOutUser()}
            className="flex items-center p-2 space-x-3 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </button>
        </li>
      </Sidebar>
      <ContentArea title="Products">
        {errors["err"] && (
          <Alert 
            title="ERROR" 
            message={errors["err"]}
            type="danger"
            onClose={()=>{
              setErrors({});
            }} 
          />
        )}
        {errors["success"] && (
          <Alert 
            title="Success" 
            message={errors["success"]}
            type="info"
            onClose={()=>{
              setErrors({});
            }} 
          />
        )}
        <ProductTable 
          token={props.token}
          loading={loading} 
          data={data} 
          prevRecords={() =>{
            let index = fromIndex;
            if (data.length > 0){
              const ids = data.map(d=>d.id);
              index = Math.min(...ids);
              console.log("data", ids, index);
            }
            fetchData(index, numPerPage, false);
          } }
          nextRecords={()=>{
            let index = fromIndex;
            if (data.length > 0){
              const ids = data.map(d=>d.id)
              index = Math.max(...ids);
              console.log("max", ids, index);
            }
            fetchData(index, numPerPage, true);
          }}
          onChangeLimit={(value)=>fetchData(new Date().getTime(), value, false)}
          onDeleteProduct={(id: number)=>{
            API.deleteProduct({id}, props.token)
              .then(()=>{
                setErrors({"success": "Successfully deleted product"});
                dispatch(deleteProduct(id));
              }).catch(()=>setErrors({"err": "Failed to deleted product"}));
          }}
        />
      </ContentArea>
    </div>
  );
};

export default DashBoard;
