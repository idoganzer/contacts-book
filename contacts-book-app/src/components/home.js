import React from 'react';
import { inject, observer } from "mobx-react";
import ContactList from './contact-list';
import SearchBar from './search-bar';
import './home.css';

const Home = inject("contactsStore")(observer(class Home extends React.Component {
  componentDidMount() {
    this.props.contactsStore.loadContacts();
  }

  handleSetPage = page => {
    this.props.contactsStore.setPage(page);
    this.props.contactsStore.loadContacts();
  };

  handleSearch = search => {
    console.log(search);
    this.props.contactsStore.setSearch(search);
    this.props.contactsStore.loadContacts();
  };

  render() {
    const {
      contactsList,
      isLoading,
      page,
      totalPagesCount,
      search
    } = this.props.contactsStore;
    return (
      <div className="home-page">
        <div className="search">
          <SearchBar
            search={search}
            onSearch={this.handleSearch}
          />
        </div>
        <div>
          <ContactList
            contacts={contactsList}
            loading={isLoading}
            totalPagesCount={totalPagesCount}
            currentPage={page}
            onSetPage={this.handleSetPage}
          />
        </div>
      </div>
    );
  }
}));

export default Home;