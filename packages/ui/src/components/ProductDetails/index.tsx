import React, { useEffect, useState, useContext } from 'react';
import { FiMoreVertical, FiEdit, FiTrash2 } from 'react-icons/fi';
import currency from 'currency.js';

import { TitleContainer, DetailCardContainer, DetailLabel, WarehouseRowContainer } from './styles';

import Header from '../Header';
import { ProductItem } from '@shared/types';
import routes from '../../util/routes';
import { ContentContainer } from '../App/styles';
import ItemStoreContext from '@ui/stores/ItemStore';
import { RouteComponentProps } from 'react-router';
import DropdownMenu from '../DropdownMenu';
import UIStoreContext from '@ui/stores/UIStore';
import ConfirmationDialog from '../ConfirmationDialog';

const ProductDetails: React.FC<ProductItem & RouteComponentProps> = props => {
  const itemStore = useContext(ItemStoreContext);
  const uiStore = useContext(UIStoreContext);

  const [product, setProduct] = useState<ProductItem>();

  useEffect(() => {
    const handleItemLoading = async () => {
      const match: any = props.match;
      const { id } = match.params;

      if (id !== undefined) {
        const product = await itemStore.fetchProduct(id);
        setProduct(product);
      }
    };

    handleItemLoading();
  }, []);

  const dropdownOptions = [
    {
      label: (
        <>
          <FiEdit />
          <span>Muuda</span>
        </>
      ),
      onClick: () => uiStore.setRoute(routes.productForm, { state: product })
    },
    {
      label: (
        <>
          <FiTrash2 />
          <span>Kustuta</span>
        </>
      ),
      onClick: () =>
        uiStore.openModal(
          <ConfirmationDialog
            icon={<FiTrash2 />}
            type="danger"
            confirmText="Kustuta"
            title="Kas oled kindel, et soovid kauba kustutada?"
            description="Kaupa saab kustutada vaid siis, kui see ei sisaldu üheski arves."
            onConfirm={() => (product && product.id ? itemStore.deleteItem(product.id) : null)}
          />
        )
    }
  ];

  const headerIcons = [<DropdownMenu button={<FiMoreVertical />} options={dropdownOptions} />];

  return (
    <>
      <Header title="Kauba detailid" components={headerIcons} backTo={routes.products} />
      <ContentContainer padded>
        {product && (
          <>
            <TitleContainer>
              <div className="product-name">{product.name}</div>
              <div className="product-code">{product.code}</div>
            </TitleContainer>
            <DetailCardContainer>
              <div className="row">
                <div className="detail">
                  <div className="detail-label">Tarnija</div>
                  <div className="detail-value">{product.partner && product.partner.name}</div>
                </div>
              </div>
              <div className="row">
                <div className="detail">
                  <div className="detail-label">Ostuhind</div>
                  <div className="detail-value">{currency(product.purchasePrice).toString()}€</div>
                </div>
                <div className="detail">
                  <div className="detail-label">Müügihind</div>
                  <div className="detail-value">{currency(product.retailPrice).toString()}€</div>
                </div>
                <div className="detail">
                  <div className="detail-label">Ühik</div>
                  <div className="detail-value">
                    {product.unit.name} ({product.unit.abbreviation})
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="detail">
                  <div className="detail-label">Märkused</div>
                  <div className="detail-value">{product.description}</div>
                </div>
              </div>
            </DetailCardContainer>
            <DetailLabel>Laoseis</DetailLabel>
            <DetailCardContainer>
              {product.warehouseQuantity &&
                product.warehouseQuantity.map((wh, i) => (
                  <WarehouseRowContainer key={i}>
                    <span className="warehouse-name">{wh.name}</span>
                    <span className="warehouse-quantity">
                      {wh.quantity}
                      {product.unit.abbreviation}
                    </span>
                  </WarehouseRowContainer>
                ))}
              <WarehouseRowContainer>
                <span className="warehouse-name">KOKKU</span>
                <span className="warehouse-quantity">
                  {product.warehouseQuantity.reduce((acc, wh) => acc + wh.quantity, 0)}
                  {product.unit.abbreviation}
                </span>
              </WarehouseRowContainer>
            </DetailCardContainer>
          </>
        )}
      </ContentContainer>
    </>
  );
};

export default ProductDetails;
