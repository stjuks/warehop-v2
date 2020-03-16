import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import currency from 'currency.js';

import Link from '../util/Link';
import Header from '../Header';
import { Transaction } from '@shared/types';
import routes from '../../util/routes';
import ContentContainer from '../util/ContentContainer';
import TransactionStoreContext from '@ui/stores/TransactionStore';
import UIStoreContext from '@ui/stores/UIStore';
import { RouteComponentProps } from 'react-router';
import { DetailCardContainer } from '../ProductDetails/styles';
import TransactionForm from '../TransactionForm';
import { FiEdit, FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import DropdownMenu from '../DropdownMenu';
import ConfirmationDialog from '../ConfirmationDialog';
import { TransactionTitle } from './styles';
import { IsPaidStyled } from '../InvoiceDetails/styles';

const TransactionDetails: React.FC<Transaction & RouteComponentProps> = props => {
  const transactionStore = useContext(TransactionStoreContext);
  const uiStore = useContext(UIStoreContext);

  const [transaction, setTransaction] = useState<Transaction>();

  useEffect(() => {
    const fetchTransaction = async () => {
      const { id }: any = props.match.params;

      if (id) {
        const loadedTransaction = await transactionStore.fetchTransaction(id);

        setTransaction(loadedTransaction);
      }
    };

    fetchTransaction();
  }, []);

  const handleTransactionDelete = async () => {
    try {
      await transactionStore.deleteTransaction(transaction?.id);
      uiStore.goTo(
        `${transaction?.type === 'EXPENSE' ? routes.purchases : routes.sales}/${
          transaction?.invoice.id
        }`
      );
    } catch (err) {
      throw err;
    }
  };

  const dropdownOptions: any[] = [];
  const headerIcons: React.ReactElement[] = [];

  if (transaction && !transaction.invoice.isLocked) {
    dropdownOptions.push(
      {
        label: (
          <>
            <FiEdit />
            <span>Muuda</span>
          </>
        ),
        onClick: () =>
          uiStore.openModal(
            <TransactionForm
              transaction={transaction}
              onSubmit={newTransaction => setTransaction({ ...transaction, ...newTransaction })}
            />
          )
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
              title="Kas oled kindel, et soovid makse kustutada?"
              onConfirm={handleTransactionDelete}
              callBackRoute={routes.incomes}
            />
          )
      }
    );
    headerIcons.push(<DropdownMenu button={<FiMoreVertical />} options={dropdownOptions} />);
  }

  return (
    <>
      <Header
        title={transaction?.type === 'EXPENSE' ? 'Kulu detailid' : 'Tulu detailid'}
        components={headerIcons}
        backTo={transaction?.type === 'EXPENSE' ? routes.expenses : routes.incomes}
      />
      <ContentContainer padded>
        {transaction && (
          <>
            <TransactionTitle type={transaction.type}>
              <div className="col-1">
                <span className="partner-name">{transaction.invoice.partner.name}</span>
                <div className="row">
                  <span className="sum">{currency(transaction.sum).toString()}€</span>
                  <div className="status">
                    <IsPaidStyled isPaid={true} isLocked={transaction.invoice.isLocked}>
                      {transaction.invoice.isLocked ? 'Kinnitatud' : 'Kinnitamata'}
                    </IsPaidStyled>
                  </div>
                </div>
              </div>
            </TransactionTitle>
            <DetailCardContainer>
              <div className="row">
                <div className="detail">
                  <div className="detail-label">Arve</div>
                  <Link
                    to={
                      transaction.invoice.type === 'PURCHASE'
                        ? `${routes.purchases}/${transaction.invoice.id}`
                        : `${routes.sales}/${transaction.invoice.id}`
                    }
                    className="detail-value"
                  >
                    {transaction.invoice.number}
                  </Link>
                </div>
                <div className="detail">
                  <div className="detail-label">Kuupäev</div>
                  <div className="detail-value">
                    {moment(transaction.date).format('DD.MM.YYYY')}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="detail">
                  <div className="detail-label">Märkused</div>
                  <div className="detail-value">{transaction.description || '-'}</div>
                </div>
              </div>
            </DetailCardContainer>
          </>
        )}
      </ContentContainer>
    </>
  );
};

export default TransactionDetails;
