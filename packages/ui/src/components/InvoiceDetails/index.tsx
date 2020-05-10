import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Invoice, AddTransactionInput } from '@shared/types';
import routes from '@ui/util/routes';
import InvoiceStoreContext from '@ui/stores/InvoiceStore';
import UIStoreContext from '@ui/stores/UIStore';
import currency from 'currency.js';
import { useGraphQLQuery, useGraphQLMutation } from '@ui/util/hooks';
import {
  FETCH_INVOICE,
  DELETE_INVOICE,
  LOCK_INVOICE,
  UNLOCK_INVOICE,
  downloadInvoice,
} from '@ui/api/invoice';

import { InvoiceHero, IsPaidStyled, InvoiceDetailsContainer, TransactionItem } from './styles';
import Header from '../Header';
import { RouteComponentProps, Route, useParams } from 'react-router';
import { DetailCardContainer, DetailLabel } from '../ProductDetails/styles';
import moment from 'moment';
import InvoiceItemListItem from '../InvoiceItemListItem';
import TransactionForm from '../TransactionForm';
import DropdownMenu from '../DropdownMenu';
import {
  FiMoreVertical,
  FiDownload,
  FiDollarSign,
  FiTrash2,
  FiEdit,
  FiChevronRight,
  FiArrowUp,
  FiArrowDown,
  FiUnlock,
  FiLock,
} from 'react-icons/fi';
import ConfirmationDialog from '../ConfirmationDialog';

interface InvoiceDetailsProps {
  invoice?: Invoice;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps & RouteComponentProps> = (props) => {
  const uiStore = useContext(UIStoreContext);

  const { id } = useParams();

  const [invoice, [, fetchInvoice], { loading: isLoadingInvoice }] = useGraphQLQuery(
    FETCH_INVOICE,
    {
      variables: { id },
      loadOnMount: true,
    }
  );

  const [lockInvoice] = useGraphQLMutation<{ id: number }>(LOCK_INVOICE);
  const [unlockInvoice] = useGraphQLMutation<{ id: number }>(UNLOCK_INVOICE);
  const [deleteInvoice] = useGraphQLMutation<{ id: number }>(DELETE_INVOICE);

  const handleInvoiceLock = async () => {
    try {
      if (invoice?.isLocked) await unlockInvoice({ id: invoice?.id }, invoice);
      else await lockInvoice({ id: invoice?.id }, invoice);
      uiStore.goBack();
    } catch (err) {
      throw err;
    }
  };

  const handleInvoiceDelete = async () => {
    try {
      await deleteInvoice({ id: invoice?.id });
      uiStore.goTo(routes.purchases);
    } catch (err) {
      throw err;
    }
  };

  const sum = invoice ? currency(invoice.sum).toString() : null;
  const issueDate = invoice ? moment(invoice.issueDate).format('DD.MM.YYYY') : null;
  const dueDate = invoice ? moment(invoice.dueDate).format('DD.MM.YYYY') : null;

  const backRoute = invoice?.type === 'PURCHASE' ? routes.purchases : routes.sales;

  const dropdownOptions: any[] = [];
  const headerComponents: any[] = [];

  if (!invoice?.isLocked)
    dropdownOptions.push(
      {
        label: (
          <>
            <FiEdit />
            <span>Muuda</span>
          </>
        ),
        onClick: () =>
          uiStore.goTo(
            `${invoice?.type === 'PURCHASE' ? routes.purchaseForm.edit : routes.saleForm.edit}/${
              invoice?.id
            }`
          ),
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
              title="Kas oled kindel, et soovid arvet kustutada?"
              description="Arve kustutamise kirjeldus..."
              icon={<FiTrash2 />}
              type="danger"
              onConfirm={handleInvoiceDelete}
            />
          ),
        isDisabled: invoice?.isLocked,
      }
    );

  if (invoice?.filePath || invoice?.type === 'SALE') {
    dropdownOptions.unshift({
      label: (
        <>
          <FiDownload />
          <span>Lae alla</span>
        </>
      ),
      onClick: () => downloadInvoice(invoice),
    });
  }

  if (!invoice?.isPaid) {
    dropdownOptions.unshift({
      label: (
        <>
          <FiDollarSign />
          <span>Maksa</span>
        </>
      ),
      onClick: () => uiStore.openModal(<TransactionForm invoice={invoice} />),
    });
  }

  if (dropdownOptions.length > 0) {
    headerComponents.push(<DropdownMenu button={<FiMoreVertical />} options={dropdownOptions} />);
  }

  const lockIcon = invoice?.isLocked ? <FiUnlock /> : <FiLock />;

  headerComponents.unshift(
    <button
      type="button"
      onClick={() =>
        uiStore.openModal(
          <ConfirmationDialog
            title={`Kas oled kindel, et soovid arvet ${
              invoice?.isLocked ? 'lukust lahti võtta' : 'lukustada'
            }?`}
            description={invoice?.isLocked ? 'Arve lukust lahti võtmine...' : 'Arve lukustamine...'}
            icon={invoice?.isLocked ? <FiUnlock /> : <FiLock />}
            onConfirm={handleInvoiceLock}
          />
        )
      }
    >
      {lockIcon}
    </button>
  );

  return (
    <>
      <Header title="Arve detailid" backTo={backRoute} components={headerComponents} />
      <InvoiceDetailsContainer padded isLoading={isLoadingInvoice}>
        {invoice && (
          <>
            <InvoiceHero paidSum={Number(invoice.paidSum)}>
              <div className="row-1">
                <span className="col-1">{invoice.partner.name}</span>
                <span className="col-2">{sum}€</span>
              </div>
              <div className="row-2">
                <span className="col-1">#{invoice.number}</span>
                <IsPaidStyled isPaid={invoice.isPaid} isLocked={invoice.isLocked}>
                  {!invoice.isLocked ? 'Kinnitamata' : invoice.isPaid ? 'Makstud' : 'Maksmata'}
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
                  <div className="detail-value">{invoice.description || '-'}</div>
                </div>
              </div>
            </DetailCardContainer>
            <DetailLabel>Kaubad</DetailLabel>
            {invoice.items.map((item) => (
              <InvoiceItemListItem item={item} key={item.id} />
            ))}
            <DetailLabel>Tehingud</DetailLabel>
            {invoice.transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                to={`${invoice.type === 'PURCHASE' ? routes.expenses : routes.incomes}/${
                  transaction.id
                }`}
              >
                {invoice.type === 'PURCHASE' ? (
                  <FiArrowDown className="expense-arrow" />
                ) : (
                  <FiArrowUp className="income-arrow" />
                )}
                <div className="sum">{currency(transaction.sum).toString()}€</div>
                <div className="date">{moment(transaction.date).format('DD.MM.YYYY')}</div>
                <FiChevronRight className="indicator" />
              </TransactionItem>
            ))}
          </>
        )}
      </InvoiceDetailsContainer>
    </>
  );
};

export default InvoiceDetails;
