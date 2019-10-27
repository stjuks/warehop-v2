import React, { useEffect, useState } from 'react';

import { TitleContainer, DetailCardContainer } from './styles';
import Header from '../Header';
import { IProductDetailed } from '../../common/types';
import { stall } from '../../util/helpers';
import sampleData from '../../common/sampleData';
import { ContentContainer } from '../App/styles';
import Footer from '../Footer';

function ProductDetails(props) {
    const [product, setProduct] = useState<IProductDetailed>();

    useEffect(() => {
        const { id } = props.match.params;

        const fetchDetails = async () => {
            await stall(500);

            const sampleProduct = sampleData.products.find(
                p => p.id === Number(id)
            );

            if (sampleProduct) setProduct(sampleProduct);
        };

        fetchDetails();
    }, [product]);

    return (
        <>
            <Header title="Kauba detailid" />
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
                                    <div className="detail-value">
                                        {product.partner.name}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="detail">
                                    <div className="detail-label">Ostuhind</div>
                                    <div className="detail-value">
                                        {product.purchasePrice}€
                                    </div>
                                </div>
                                <div className="detail">
                                    <div className="detail-label">
                                        Müügihind
                                    </div>
                                    <div className="detail-value">
                                        {product.retailPrice}€
                                    </div>
                                </div>
                                <div className="detail">
                                    <div className="detail-label">Ühik</div>
                                    <div className="detail-value">
                                        {product.unit.name}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="detail">
                                    <div className="detail-label">Märkused</div>
                                    <div className="detail-value">
                                        {product.description}
                                    </div>
                                </div>
                            </div>
                        </DetailCardContainer>
                    </>
                )}
            </ContentContainer>
            <Footer />
        </>
    );
}

export default ProductDetails;
