import React, { useEffect, useContext, useState } from 'react';
import { Invoice } from '@shared/types';
import routes from '@ui/util/routes';
import InvoiceStoreContext from '@ui/stores/InvoiceStore';
import currency from 'currency.js';

import { InvoiceHero, IsPaidStyled, InvoiceDetailsContainer } from './styles';
import Header from '../Header';
import { RouteComponentProps } from 'react-router';
import { DetailCardContainer, DetailLabel } from '../ProductDetails/styles';
import moment from 'moment';
import InvoiceItemListItem from '../InvoiceItemListItem';
import DropdownMenu from '../DropdownMenu';
import { FiMoreVertical, FiDownload } from 'react-icons/fi';

interface InvoiceDetailsProps {
  invoice?: Invoice;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps & RouteComponentProps> = props => {
  const invoiceStore = useContext(InvoiceStoreContext);
  const [invoice, setInvoice] = useState<Invoice | undefined>(undefined);

  useEffect(() => {
    const handleInvoiceLoading = async () => {
      const location: any = props.location;

      if (location.invoice) {
        setInvoice(location.invoice);
      } else {
        const match: any = props.match;
        const { id } = match.params;

        if (id !== undefined) {
          const invoice = await invoiceStore.fetchInvoice(id);
          setInvoice(invoice);
        }
      }
    };

    handleInvoiceLoading();
  }, []);

  const sum = invoice ? currency(invoice.sum).toString() : null;
  const issueDate = invoice ? moment(invoice.issueDate).format('DD.MM.YYYY') : null;
  const dueDate = invoice ? moment(invoice.dueDate).format('DD.MM.YYYY') : null;

  const backRoute = invoice && invoice.type === 'PURCHASE' ? routes.purchases : routes.sales;

  const headerComponents = [
    <DropdownMenu
      button={<FiMoreVertical />}
      options={[
        { label: 'Kustuta', onClick: () => console.log('delete') },
        { label: 'Muuda', onClick: () => console.log('edit') }
      ]}
    />
  ];

  if (invoice && invoice.filePath) {
    headerComponents.unshift(
      <button onClick={() => invoiceStore.downloadInvoice(invoice?.id || -1)}>
        <FiDownload />
      </button>
    );
  }

  return (
    <>
      <Header title='Arve detailid' backTo={backRoute} components={headerComponents} />
      <InvoiceDetailsContainer padded>
        {invoice && (
          <>
            <InvoiceHero>
              <div className='row-1'>
                <span className='col-1'>{invoice.partner.name}</span>
                <span className='col-2'>{sum}€</span>
              </div>
              <div className='row-2'>
                <span className='col-1'>#{invoice.number}</span>
                <IsPaidStyled isPaid={invoice.isPaid}>
                  {invoice.isPaid ? 'Makstud' : 'Maksmata'}
                </IsPaidStyled>
              </div>
            </InvoiceHero>
            <DetailCardContainer>
              <div className='row'>
                <div className='detail'>
                  <div className='detail-label'>Ostukuupäev</div>
                  <div className='detail-value'>{issueDate}</div>
                </div>
                <div className='detail'>
                  <div className='detail-label'>Maksetähtaeg</div>
                  <div className='detail-value'>{dueDate}</div>
                </div>
              </div>
              <div className='row'>
                <div className='detail'>
                  <div className='detail-label'>Märkused</div>
                  <div className='detail-value'>{invoice.description || '-'}</div>
                </div>
              </div>
            </DetailCardContainer>
            <DetailLabel>Kaubad</DetailLabel>
            {invoice.items.map(item => (
              <InvoiceItemListItem item={item} key={item.id} />
            ))}
          </>
        )}
      </InvoiceDetailsContainer>
    </>
  );
};

export default InvoiceDetails;
