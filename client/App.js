import React from "react";
import ReactDOM from "react-dom/client";
import Profile from "./src/profile";
import { BrowserRouter } from "react-router-dom";
import Index from "./src/Index";
import { Authprovider } from "./src/context/auth";

const App = () => {
  return (
    <div>
      <Authprovider>
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      </Authprovider>
    </div>
  );
};

const Root = ReactDOM.createRoot(document.getElementById("root"));
Root.render(<App />);
