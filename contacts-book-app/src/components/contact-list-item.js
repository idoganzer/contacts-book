import React from 'react';
import avatar from '../avatar.jpeg';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './contact-list-item.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: 20,
    margin: '20px 20px 20px 0',
    height: 140,
    width: 300,
    backgroundColor: 'beige'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 100,
    height: 100
  }
}));

export default function ContactListItem(props) {
  const contact = props.contact;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={avatar}/>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1">
            {contact.firstName} {contact.lastName}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
          {contact.phone}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
          {contact.email}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
          {contact.company}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};