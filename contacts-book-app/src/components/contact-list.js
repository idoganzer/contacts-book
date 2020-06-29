import React from 'react';
import ContactListItem from './contact-list-item';
import Pagination from './pagination';

class ContactList extends React.Component {
  render() {
    if (!this.props.contacts.size || this.props.contacts.size === 0) {
      return (
        <div>
          No Contacts Found...
        </div>
      );
    }
    return (
      <div>
        <div> 
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {
              [...this.props.contacts.values()].map(contact => {
                return (
                  <ContactListItem key={contact.id} contact={contact}/>
                );
              })
            }
          </div>

          <Pagination
            onSetPage={this.props.onSetPage}
            totalPagesCount={this.props.totalPagesCount}
            currentPage={this.props.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default ContactList;