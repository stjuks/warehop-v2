import React, { useEffect, useContext, useState } from 'react';
import { Invoice } from '@shared/types';
import routes from '@ui/util/routes';
import InvoiceStoreContext from '@ui/stores/InvoiceStore';
import currency from 'currency.js';

import { InvoiceHero, IsPaidStyled, PurchaseDetailsContainer } from './styles';
import Header from '../Header';
import { RouteComponentProps } from 'react-router';
import { DetailCardContainer, DetailLabel } from '../ProductDetails/styles';
import moment from 'moment';
import PurchaseItem from '../NewPurchase/PurchaseItem';

interface PurchaseDetailsProps {
    purchase: Invoice;
}

const PurchaseDetails: React.FC<PurchaseDetailsProps & RouteComponentProps> = props => {
    const invoiceStore = useContext(InvoiceStoreContext);
    const [purchase, setPurchase] = useState<Invoice | undefined>(undefined);

    useEffect(() => {
        const handlePurchase = async () => {
            const location: any = props.location;

            if (location.purchase) {
                setPurchase(location.purchase);
            } else {
                const match: any = props.match;
                const { id } = match.params;

                if (id !== undefined) {
                    const purchase = await invoiceStore.fetchInvoice(id);
                    setPurchase(purchase);
                }
            }
        };

        handlePurchase();
    }, []);

    const sum = purchase ? currency(purchase.sum).toString() : null;
    const issueDate = purchase ? moment(purchase.issueDate).format('DD.MM.YYYY') : null;
    const dueDate = purchase ? moment(purchase.dueDate).format('DD.MM.YYYY') : null;

    return (
        <>
            <Header title="Arve detailid" backTo={routes.purchases} />
            <PurchaseDetailsContainer>
                {purchase ? (
                    <>
                        <InvoiceHero>
                            <div className="row-1">
                                <span className="col-1">{purchase.partner.name}</span>
                                <span className="col-2">{sum}€</span>
                            </div>
                            <div className="row-2">
                                <span className="col-1">#{purchase.number}</span>
                                <IsPaidStyled isPaid={purchase.isPaid}>
                                    {purchase.isPaid ? 'Makstud' : 'Maksmata'}
                                </IsPaidStyled>
                            </div>
                        </InvoiceHero>
                        <DetailCardContainer>
                            <div className="row">
                                <div className="detail">
                                    <div className="detail-label">Ostukuupäev</div>
                                    <div className="detail-value">{issueDate}</div>
                                </div>
                                <div className="detail">
                                    <div className="detail-label">Maksetähtaeg</div>
                                    <div className="detail-value">{dueDate}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="detail">
                                    <div className="detail-label">Märkused</div>
                                    <div className="detail-value">{purchase.description || '-'}</div>
                                </div>
                            </div>
                        </DetailCardContainer>
                        <DetailLabel>Kaubad</DetailLabel>
                        {purchase.items.map(item => (
                            <PurchaseItem item={item} key={item.id} />
                        ))}
                    </>
                ) : null}
            </PurchaseDetailsContainer>
        </>
    );
};

export default PurchaseDetails;
