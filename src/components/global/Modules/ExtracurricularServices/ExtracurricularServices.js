import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import { Button, Card } from 'react-bootstrap';

//Styles
import "./ExtracurricularServices.css"

const styles = {
    products: {
      display: 'flex',
      alignItems: 'stretch',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    product: {
      width: '220px',
      marginLeft: 10,
      marginRight: 10
    }
};

class ExtracurricularServices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [
                { id: 1, name: "Hipster Ultimate", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 299, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-1.jpg" },
                { id: 2, name: "On Motion Live", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 99, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg" },
                { id: 3, name: "Underground Max", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 149, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-3.jpg" },
                { id: 4, name: "Hipster Ultimate", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 299, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-1.jpg" },
                { id: 5, name: "On Motion Live", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 99, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg" },
                { id: 6, name: "Underground Max", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 149, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-3.jpg" },
                { id: 7, name: "Hipster Ultimate", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 299, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-1.jpg" },
                { id: 8, name: "On Motion Live", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 99, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg" },
                { id: 9, name: "Underground Max", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 149, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-3.jpg" },
              ]
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div style={styles.products}>
                {this.state.products.map(product =>
                    <div className="card cardCustom" key={product.id}>
                        <img src={product.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                        </div>
                        <div className="card-footer">
                            <div id="boxContainer">
                                <div id="box1">
                                    <a id="addActivityBtn" href="#" className="btn btn-primary">Inscribir</a>
                                </div>
                                <div id="box2">
                                    <NumberFormat id="priceSpan" value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

ExtracurricularServices.propTypes = {

};



export default ExtracurricularServices;