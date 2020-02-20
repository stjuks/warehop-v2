import React, { useEffect, useState, useContext } from 'react';
import { FiMoreHorizontal, FiEdit, FiTrash2 } from 'react-icons/fi';

import { TitleContainer, DetailCardContainer, DetailLabel, WarehouseRowContainer } from './styles';
import { theme } from '@ui/util/styled';

import Header from '../Header';
import { MenuPopover } from '../Popover';
import { ProductItem } from '@shared/types';
import routes from '../../util/routes';
import { ContentContainer } from '../App/styles';
import ItemStoreContext from '@ui/stores/ItemStore';
import { RouteComponentProps } from 'react-router';

const ProductDetails: React.FC<ProductItem & RouteComponentProps> = props => {
  const itemStore = useContext(ItemStoreContext);
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

  const headerIcons = [
    <MenuPopover
      options={[
        {
          label: (
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <FiEdit style={{ margin: '0 0.25rem 0.1rem 0' }} />
              Muuda
            </div>
          ),
          onClick: () => null
        },
        {
          label: (
            <div
              style={{
                color: theme.colors.danger.toString(),
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <FiTrash2 style={{ margin: '0 0.25rem 0.1rem 0' }} />
              Kustuta
            </div>
          ),
          onClick: () => null
        }
      ]}
      position="bottom"
      closeContentOnClick
    >
      <FiMoreHorizontal />
    </MenuPopover>
  ];

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
                  <div className="detail-value">{product.purchasePrice}€</div>
                </div>
                <div className="detail">
                  <div className="detail-label">Müügihind</div>
                  <div className="detail-value">{product.retailPrice}€</div>
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
