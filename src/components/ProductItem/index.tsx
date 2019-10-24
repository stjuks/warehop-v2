import React from 'react';

import { FiChevronRight } from 'react-icons/fi';
import { ProductItemContainer } from './styles';

interface IProductItemProps {
    name: string;
    price: Number;
    code: string;
    quantity: Number;
    unit: {
        abbr: string;
        name: string;
    };
}

function ProductItem({ name, price, code, quantity, unit }: IProductItemProps) {
    return (
        <ProductItemContainer>
            <div className="col-1">
                <div className="row-1">
                    <div className="product-name">{name}</div>
                    <div className="product-price">{price}€</div>
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
