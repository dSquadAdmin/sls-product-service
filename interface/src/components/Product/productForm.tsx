import React from "react";
import Modal from "../UiComponents/Modal";
import { Alert } from "../UiComponents/Alert";
import { useDispatch } from "react-redux";
import { IProduct } from "../../types";
import { saveProduct as actionSaveProduct } from "../../reducers/product";
import { saveProduct } from '../../api';
import InputField from "../UiComponents/Input/input";
import { TextArea } from "../UiComponents/Input/textarea";

interface IProps {
  show: boolean;
  token: string;
  closeForm: () => void;
}

export const ProductForm = (props: IProps) => {
  const { show, token, closeForm } = props;
  const [errors, setErrors] = React.useState<any>({});
  const dispatch = useDispatch();
  const [product, setProduct] = React.useState<IProduct>({
    name: "",
    description: "",
    imageUrl: "",
    price: 0,
    id: 0,
  });

  const validateUrl = (url: string) => {
    if (/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)) {
      return true;
    }
    return false;
  };

  const handleClose = () => {
    setProduct({
      name: "",
      description: "",
      imageUrl: "",
      price: 0,
      id: 0,
    });
    setErrors({});
    closeForm();
  };
  

  const handelValueChange = (name: string, event: any) => {
    let err = { ...errors };
    delete err[name];
    const prod = { ...product, [name]: event.target.value};
    setProduct({...prod});
  };

  const validate = () => {
    let valid = true;
    let errs = { ...errors };
    if (product.name === "") {
      errs["name"] = "Name of the product is required field.";
      valid = false
    }

    if (product.description === "") {
      errs["description"] = "Description of the product is required field.";
      valid = false
    }

    if (product.price <= 0) {
      errs["price"] = "Price of the product is required field.";
      valid = false
    }

    if (product.imageUrl === "") {
      errs["imageUrl"] = "Product image URL is required field.";
      valid = false
    } else if (!validateUrl(product.imageUrl)) {
      errs["imageUrl"] = "Product image URL is not valid.";
      valid = false
    }
    setErrors({...errs});
    return valid;
  };

  const submit = () => {
    if (validate()){
      saveProduct(product, token).then((result: any)=>{
        dispatch(actionSaveProduct(result.data.data.data as IProduct));
        handleClose();
      }).catch(()=>(setErrors({...errors, err: "Unable to create product."})));
    }
  };

  return (
    <Modal
      showModal={show}
      onClickPrimary={() => {
        submit();
      }}
      onClickCancel={() => {
        handleClose();
      }}
      title={""}
    >
      {errors["err"] && (
        <Alert
          title={"Error"}
          message={errors["err"]}
          type={"danger"}
          onClose={() => {
            let err = {...errors};
            delete err["err"];
            setErrors({...err});
          }}
        />
      )}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <InputField   
          name={"name"} 
          type="text"
          label={"Name"} 
          isError={errors["name"]} 
          placeholder={"name"} 
          value={product.name}
          message={"Name is required field."} 
          onChange={(ev)=>handelValueChange("name", ev)}         
        />
        <TextArea   
          name={"description"}
          value={product.description}
          label={"Description"} 
          isError={errors["description"]}
          placeholder={"Description"} 
          message={"Description is required field."} 
          onChange={(ev)=>handelValueChange("description", ev)}         
        />
        <InputField   
          name={"price"} 
          type="number"
          label={"Price"}
          isError={errors["price"]} 
          placeholder={"Price"} 
          message={"Price is required field."} 
          onChange={(ev)=>handelValueChange("price", ev)}         
        />
        <InputField   
          name={"imageUrl"} 
          type="url"
          label={"Image URL"}
          isError={errors["imageUrl"]} 
          placeholder={"http://www.example.com"} 
          message={"Image URL is invalid."} 
          onChange={(ev)=>handelValueChange("imageUrl", ev)}         
        />
      </div>
    </Modal>
  );
};
