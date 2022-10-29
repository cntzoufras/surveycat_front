import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EmailsProps } from '@/shared/prop-types/EmailProps';
import { Table } from '@/shared/components/TableElements';
import { paddingRight, paddingLeft, right } from '@/utils/directions';
import EmailListItem from './EmailListItem';
import EmailsControls from './EmailsControls';

const InboxTable = ({ emails, onLetter }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [pageOfItems, setPageOfItems] = useState(null);
  const [emailsWithID, setEmailsWithID] = useState([]);

  useEffect(() => {
    setEmailsWithID(emails.map((item, index) => ({ ...item, id: index })));
  }, [emails]);

  const onChangePage = (page) => {
    setPageOfItems(page);
  };

  const onChangeSelect = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <EmailsControls
        emails={emails}
        onChangePage={onChangePage}
        onChangeSelect={onChangeSelect}
        pageOfItems={pageOfItems}
      />
      <InboxEmailsTable bordered responsive>
        <tbody>
          {emailsWithID.slice(1, 15).map((item, index) => (
            <EmailListItem
              key={item.id}
              email={item}
              itemId={index}
              onLetter={onLetter}
              isChecked={isChecked}
            />
          ))}
        </tbody>
      </InboxEmailsTable>
    </div>
  );
};

InboxTable.propTypes = {
  emails: EmailsProps.isRequired,
  onLetter: PropTypes.func.isRequired,
};

export default InboxTable;

// region STYLES

const InboxEmailsTable = styled(Table)`
  margin-bottom: 10px;

  tr td:first-child {
    ${paddingLeft}: 0;
  }

  tr td:last-child {
    ${paddingRight}: 0;
    text-align: ${right};
  }
`;

// endregion
