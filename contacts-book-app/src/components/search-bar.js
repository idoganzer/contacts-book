import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import './search-bar.css';

const SearchBar = props => {
  const onSearchChange = ev => {
    props.onSearch(ev.target.value);
  };
  const AddButton = withRouter(({ history }) => (
    <IconButton color="primary"
      onClick={() => { history.push('/contacts/new') }}>
      <AddIcon />
    </IconButton>
  ))
  return (
    <div className="search-bar">
      <TextField className="search-text"
        id="search"
        placeholder="search..."
        onChange={onSearchChange}
        value={props.search}
      />
      <AddButton/>
    </div>
  );
};

export default SearchBar;