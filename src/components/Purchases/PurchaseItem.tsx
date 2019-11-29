import React from 'react';

interface IPurchaseItemProps {
    invoiceNr: string;
    purchaseDate: Date;
    dueDate: Date;
    sum: number;
    isPaid: boolean;
}

const PurchaseItem: React.FC<IPurchaseItemProps> = ({ invoiceNr, purchaseDate, dueDate, sum, isPaid }) => {
    const getDaysUntilDueDate = () => {};

    return (
        <div>Product</div>
        /* <PurchaseItemContainer>
            <div className="row-1">
                <div className="col-1">
                    {invoiceNr}
                </div>
                <div className="col-2">
                    {sum}€
                </div>
            </div>
            <div className="row-2">
                <div className="col-1">
                    #{invoiceNr}
                </div>
                <div className="col-2">
                    {getDaysUntilDueDate()}
                </div>
            </div>
        </PurchaseItemContainer> */
    );
};

export default PurchaseItem;
