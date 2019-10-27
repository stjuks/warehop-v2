import React from 'react';

import { FiChevronRight } from 'react-icons/fi';
import { ProductItemContainer } from './styles';
import { IProduct } from '../../common/types';
import routes from '../../common/routes';

function ProductItem(product: IProduct) {
    const { id, name, retailPrice, code, quantity, unit } = product;

    return (
        <ProductItemContainer
            to={{ pathname: `${routes.products}/${id}`, product }}
        >
            <div className="col-1">
                <div className="row-1">
                    <div className="product-name">{name}</div>
                    <div className="product-price">{retailPrice}€</div>
                </div>
                <div className="row-2">
                    <div className="product-code">{code}</div>
                    <div className="product-quantity">
                        {quantity}
                        {unit.abbr}
                    </div>
                </div>
            </div>
            <div className="col-2">
                <FiChevronRight />
            </div>
        </ProductItemContainer>
    );
}

export default ProductItem;
