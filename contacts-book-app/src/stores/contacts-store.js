import { observable, computed, action, decorate } from "mobx"

const LIMIT = 9;

export class ContactsStore {

  isLoading = false;
  page = 0;
  totalPagesCount = 0;
  contactsList = observable.map();
  search = '';

  get contacts() {
    return this.contactsList.values();
  };

  clear() {
    this.contactsList.clear();
    this.page = 0;
  }

  getContact(id) {
    return this.contactsList.get(id);
  }

  setPage(page) {
    this.page = page;
  }

  setSearch(search) {
    this.search = search;
  }

  loadContacts() {
    this.isLoading = true;
    return fetch('/contacts?limit=' + LIMIT + '&page=' + this.page + '&search=' + this.search)
      .then(res => res.json())
      .then((response) => {
        this.contactsList.clear();
        response.contacts.forEach(contact => this.contactsList.set(contact.id, contact));
        this.totalPagesCount = Math.ceil(response.total / LIMIT);
        console.log(this.contactsList);
      })
      .finally(action(() => { this.isLoading = false; }));
  }

  createContact(contact) {
    this.isLoading = true;
    console.log(contact);
    return fetch('/contacts', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(contact)
    })
    .finally(action(() => { this.isLoading = false; }));
  }
}

decorate(ContactsStore, {
  isLoading: observable,
  page: observable,
  totalPagesCount: observable,
  contacts: computed,
  search: observable,
  setPage: action,
  loadContacts: action,
  contactsList: observable,
  createContact: action
});

export default new ContactsStore();