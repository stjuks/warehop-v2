import React from 'react';
import { Partner } from '@shared/types';
import { PartnerListItemContainer } from './styles';
import { FiPhone, FiMail } from 'react-icons/fi';
import routes from '@ui/util/routes';

const PartnerListItem: React.FC<Partner> = ({ name, phoneNr, id, email }) => {
    return (
        <PartnerListItemContainer to={`${routes.partners}/${id}`}>
            <div className="col-1">
                <div className="row row-1">{name}</div>
                <div className="row row-2">
                    <div className="contact-detail">
                        <FiPhone />
                        {phoneNr}
                    </div>
                    <div className="contact-detail">
                        <FiMail />
                        {email}
                    </div>
                </div>
            </div>
        </PartnerListItemContainer>
    );
};

export default PartnerListItem;
