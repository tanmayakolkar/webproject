import React from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.match.params.product_id,
      selectedProduct: {
        name: "",
        image: "",
        price: "",
        qty: "",
        info: "",
      },
      isSubmitted: false,
    };
  }
  componentDidMount() {
    let dataURL = `http://127.0.0.1:5000/api/products/${this.state.productId}`;
    console.log(dataURL);
    Axios.get(dataURL)
      .then((response) => {
        console.log(response.data.Product);
        this.setState({
          ...this.state,
          selectedProduct: response.data.Product,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  updateInput = (event) => {
    this.setState({
      ...this.state,
      selectedProduct: {
        ...this.state.selectedProduct,
        [event.target.name]: event.target.value,
      },
    });
  };

  // updateImage
  updateImage = async (event) => {
    let imageFile = event.target.files[0];
    let base64Image = await this.convertBase64String(imageFile);
    this.setState({
      ...this.state,
      selectedProduct: {
        ...this.state.selectedProduct,
        image: base64Image,
      },
    });
  };

  convertBase64String = (imageFile) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.addEventListener("load", () => {
        if (fileReader.result) {
          resolve(fileReader.result);
        } else {
          reject("Error Occurred");
        }
      });
    });
  };

  submitUpdateProduct = (event) => {
    event.preventDefault();
    let dataURL = `http://127.0.0.1:5000/api/products/${this.state.productId}`;
    Axios.put(dataURL, this.state.selectedProduct)
      .then((response) => {
        this.setState({
          ...this.state,
          isSubmitted: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let { selectedProduct } = this.state;
    return (
      <React.Fragment>
        {this.state.isSubmitted ? (
          <Redirect to="/products/admin" />
        ) : (
          <React.Fragment>
            <section className="p-3">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <p className="h3 text-secondary">Update a Product</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Architecto delectus ducimus, eius et excepturi facere
                      iusto, nesciunt nulla obcaecati quibusdam repellat unde
                      voluptatem voluptates! Animi cum dolorem est et ex.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-header bg-secondary text-white">
                        <p className="h4">Update Product</p>
                      </div>
                      <div className="card-body rgba-purple-light">
                        <form onSubmit={this.submitUpdateProduct}>
                          <div className="form-group">
                            <input
                              name="name"
                              value={selectedProduct.name}
                              onChange={this.updateInput}
                              type="text"
                              className="form-control"
                              placeholder="Name"
                            />
                          </div>
                          <div className="form-group">
                            <div className="custom-file">
                              <input
                                onChange={this.updateImage}
                                type="file"
                                className="custom-file-input"
                                id="customFile"
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                {selectedProduct.image.length > 0 ? (
                                  <img
                                    src={selectedProduct.image}
                                    alt=""
                                    width="25"
                                    height="25"
                                  />
                                ) : (
                                  "Product Image"
                                )}
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <input
                              name="price"
                              value={selectedProduct.price}
                              onChange={this.updateInput}
                              type="text"
                              className="form-control"
                              placeholder="Price"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              name="qty"
                              value={selectedProduct.qty}
                              onChange={this.updateInput}
                              type="text"
                              className="form-control"
                              placeholder="Qty"
                            />
                          </div>
                          <div className="form-group">
                            <textarea
                              name="info"
                              value={selectedProduct.info}
                              onChange={this.updateInput}
                              rows="3"
                              className="form-control"
                              placeholder="Info"
                            />
                          </div>
                          <div>
                            <input
                              type="submit"
                              className="btn btn-sm btn-secondary"
                              value="Update"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default UpdateProduct;
