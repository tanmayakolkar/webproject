import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./root/components/navbar/Navbar";
import Home from "./root/components/home/Home";
import ProductList from "./products/list/ProductList";
import ProductAdmin from "./products/admin/ProductAdmin";
import CreateProduct from "./products/create/CreateProduct";
import UpdateProduct from "./products/update/UpdateProduct";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products/list" component={ProductList} />
            <Route exact path="/products/admin" component={ProductAdmin} />
            <Route exact path="/products/create" component={CreateProduct} />
            <Route
              exact
              path="/products/:product_id"
              component={UpdateProduct}
            />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
export default App;
