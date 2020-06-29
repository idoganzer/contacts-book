import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import Button from '@material-ui/core/Button';
import { decorate } from 'mobx';
import { withRouter } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import Grid from '@material-ui/core/Grid';
import 'react-phone-input-2/lib/style.css';
import './contact-details.css';
import Typography from '@material-ui/core/Typography';

 const ContactDetails = inject("contactsStore")(observer(class ContactDetails extends React.Component {
  firstName = '';
  lastName = '';
  company = '';
  email = '';
  phone = '';
  
  handleSave = () => {
    this.props.contactsStore.createContact({
      firstName: this.firstName, lastName: this.lastName, company: this.company, 
      email: this.email, phone: this.phone
    }).then(() => {
      this.props.contactsStore.loadContacts();
    }).then(this.props.history.goBack());
  }

  render() {
    return (
      <div className="contact-details-container contact-details-center">
        
          <Typography variant="h4">Contact Details</Typography>
        
      
          <TextField className="contact-input"
            onChange={(e) => this.firstName = e.target.value}
            placeholder="First Name"
          />
        
          <TextField className="contact-input"
              onChange={(e) => this.lastName = e.target.value}
              placeholder="Last Name"
            />
        
        
          <TextField className="contact-input"
              onChange={(e) => this.email = e.target.value}
              placeholder="Email"
          />
        
        
          <TextField className="contact-input"
              onChange={(e) => this.company = e.target.value}
              placeholder="Company"
          />
        
        
          <PhoneInput className="contact-input"
              country={'us'}
              placeholder="Enter phone number"
              onChange={(v) => this.phone = v}/>
        
        <div className="contact-input-container">
          <Button className="contact-button"
              onClick={this.handleSave}
              variant="contained" color="primary">
            Save
          </Button>
          <Button className="contact-button"
            onClick={() => this.props.history.goBack()} 
            variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}));

decorate(ContactDetails, {
  firstName: observable,
  lastName: observable,
  company: observable,
  email: observable,
  phone: observable
});

export default ContactDetails;
