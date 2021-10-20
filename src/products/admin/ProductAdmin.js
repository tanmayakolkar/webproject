import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class ProductAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts = () => {
    let dataURL = "http://127.0.0.1:5000/api/products/";
    Axios.get(dataURL)
      .then((response) => {
        console.log(response.data.products);
        this.setState({
          products: response.data.products,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  clickDeleteProduct = (productId) => {
    let dataURL = `http://127.0.0.1:5000/api/products/${productId}`;
    Axios.delete(dataURL)
      .then((response) => {
        this.getAllProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <React.Fragment>
        <section className="p-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h3 text-success">Product Admin</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                  atque debitis, dicta ducimus ea, ex iste maxime molestias nemo
                  nostrum odio perferendis perspiciatis praesentium, quo rerum
                  tempore veritatis voluptatem voluptatum?
                </p>
                <Link to="/products/create" className="btn btn-success btn-sm">
                  Create New
                </Link>
              </div>
            </div>
          </div>
        </section>
        <pre>{JSON.stringify(this.state.products)}</pre>
        <section>
          <div className="container">
            <div className="row">
              <div className="col">
                <table className="table table-hover text-center table-striped table-success">
                  <thead className="bg-dark text-success">
                    <tr>
                      <th>SNO</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {this.state.products.length > 0 ? (
                    <tbody>
                      {this.state.products.map((product) => {
                        return (
                          <tr key={product._id}>
                            <td>
                              {product._id.substr(product._id.length - 5)}
                            </td>
                            <td>
                              <img
                                src={product.image}
                                alt=""
                                width="50"
                                height="50"
                              />
                            </td>
                            <td>{product.name}</td>
                            <td>&#8377; {product.price.toFixed(2)}</td>
                            <td>{product.qty} Kgs</td>
                            <td>
                              <Link
                                to={`/products/${product._id}`}
                                className="btn btn-secondary btn-sm"
                              >
                                Update
                              </Link>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={this.clickDeleteProduct.bind(
                                  this,
                                  product._id
                                )}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="6" className="text-danger">
                          ------ NO Products Found ---------
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default ProductAdmin;
