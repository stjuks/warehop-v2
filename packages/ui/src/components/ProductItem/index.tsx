import React from 'react';
import currency from 'currency.js';

import { FiChevronRight } from 'react-icons/fi';
import { ProductItemContainer } from './styles';
import { ProductItem as ProductItemType } from '@shared/types';
import routes from '../../util/routes';

function ProductItem(product: ProductItemType) {
  const { id, name, retailPrice, code, warehouseQuantity, unit } = product;

  const quantity = warehouseQuantity.reduce((acc, wh) => acc + wh.quantity, 0);

  return (
    <ProductItemContainer to={{ pathname: `${routes.products}/${id}`, product }}>
      <div className="col-1">
        <div className="row-1">
          <div className="product-name">{name}</div>
          <div className="product-price">{retailPrice ? `${currency(retailPrice)}€` : '-'}</div>
        </div>
        <div className="row-2">
          <div className="product-code">{code}</div>
          <div className="product-quantity">
            {quantity}
            {unit.abbreviation}
          </div>
        </div>
      </div>
    </ProductItemContainer>
  );
}

export default ProductItem;
