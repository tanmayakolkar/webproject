import React from "react";
import Axios from "axios";
class ProductList extends React.Component {
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
  render() {
    let { products } = this.state;
    return (
      <React.Fragment>
        <section className="p-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h3 text-success">Product List</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                  atque debitis, dicta ducimus ea, ex iste maxime molestias nemo
                  nostrum odio perferendis perspiciatis praesentium, quo rerum
                  tempore veritatis voluptatem voluptatum?
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              {products.length > 0 ? (
                <React.Fragment>
                  {products.map((product) => {
                    return (
                      <div className="col-md-3" key={product._id}>
                        <div className="card">
                          <div className="card-header text-center bg-white">
                            <img
                              src={product.image}
                              alt=""
                              width="150"
                              height="150"
                            />
                          </div>
                          <div className="card-body">
                            <ul className="list-group">
                              <li className="list-group-item">
                                NAME : {product.name}
                              </li>
                              <li className="list-group-item">
                                Price : &#8377; {product.price.toFixed(2)}
                              </li>
                              <li className="list-group-item">
                                Qty : {product.qty} Kgs
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className="h5 text-danger">
                    ----------- NO Products Found --------
                  </p>
                </React.Fragment>
              )}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ProductList;
