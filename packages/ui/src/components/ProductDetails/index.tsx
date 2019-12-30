import React, { useEffect, useState, useContext } from 'react';
import { FiMoreHorizontal, FiEdit, FiTrash2 } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';

import { TitleContainer, DetailCardContainer, DetailLabel, WarehouseRowContainer } from './styles';
import theme from '../../util/theme';

import Header from '../Header';
import { MenuPopover } from '../Popover';
import { Product } from 'shared/types';
import { stall } from '../../util/helpers';
import routes from '../../common/routes';
import sampleData from '../../common/sampleData';
import { ContentContainer } from '../App/styles';
import Footer from '../Footer';
import { ProductStoreContext } from '../../stores/ProductStore';

const ProductDetails = props => {
    const productStore = useContext(ProductStoreContext);
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        const { id } = props.match.params;

        const fetchDetails = async () => {
            await stall(500);

            const sampleProduct = sampleData.products.find(p => p.id === Number(id));

            if (sampleProduct) setProduct(sampleProduct);
        };

        fetchDetails();
    }, [product, props.match.params]);


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
                                color: theme.colors.danger,
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
                                    <div className="detail-value">{product.vendor && product.vendor.name}</div>
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
                            {product.quantityByWarehouse && product.quantityByWarehouse.map((wh, i) => (
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
                                    {product.quantity}
                                    {product.unit.abbreviation}
                                </span>
                            </WarehouseRowContainer>
                        </DetailCardContainer>
                    </>
                )}
            </ContentContainer>
        </>
    );
}

export default ProductDetails;