import React, {useState } from "react";
import InputField from "../UiComponents/Input/input";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { saveUserAuth } from "../../reducers/auth";
// import { getProducts } from "../../api";
// import { loadedProducts, loadingProducts, saveProducts } from "../../reducers/product";
import logo from "../../logo.png";
import { AppState } from "../../store";

const Login = () => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state: AppState)=>state.product);

  const onChange = (event: any) => {
    setToken(event.target.value);
  };

  const saveToken = async () => {
    try {
      // dispatch(loadingProducts());
      // const data = await getProducts({ fromIndex: 0, limit: 25 }, token);
      dispatch(saveUserAuth(token));
      setToken(token);
      // saveProducts({ ...data.data, fromIndex: 0, limit: 25 });
    } catch (err) {
      // setMessage("Invalid API key.");
    }
    // dispatch(loadedProducts());
  };
  
  return (
    <div className="login">
      <div className="ml-auto mr-auto w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div>
            <img
              className="object-scale-down h-auto w-96"
              src={logo}
              alt="logo"
            />
          </div>
          <InputField
            key={message}
            name={"API Key"}
            label={"Api Key"}
            type="password"
            isError={message !== ""}
            placeholder={"api key"}
            value={token}
            message={message}
            onChange={onChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            disabled={loading}
            onClick={() => saveToken()}
          >
            {loading ? "Logging In" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
