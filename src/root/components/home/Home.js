import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="landing-page">
          <div className="wrapper">
            <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
              <h5 className="display-4">Shop Online Here</h5>
              <p className="lead px-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eligendi placeat, tempora. Accusantium debitis deleniti dolorem,
                ea facilis in maiores nesciunt nisi nostrum pariatur placeat
                quibusdam recusandae soluta ullam vitae voluptate?
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Home;
