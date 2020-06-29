var express = require('express');
const database = require('sqlite-async');
var router = express.Router();

router.get('/', async function(req, res) {
  let db = await database.open('./db/contactBook.db')
    .then(db => {
      console.log('Connected to the SQlite database.');
      return db;
    })
    .catch(err => {
      console.error(err.message);
    })

  const page = req.query.page ? req.query.page : 0;
  const limit = req.query.limit ? req.query.limit : 10;
  const offset = page * limit;
  const search = req.query.search ? req.query.search.trim() : null;

  let filter = getSqlFilter(search);
  let countSql = `SELECT COUNT(*) as count FROM contacts ` + filter;
  let searchSql = 'SELECT * FROM contacts ' + filter + ' LIMIT ? OFFSET ?;';

  const total = await db.get(countSql, []);

  const contacts = await db.all(searchSql, [limit, offset]);

  res.json({
    total: total.count,
    page: page,
    contacts: contacts
  });


  db.close();
});

router.post('/', async function(req, res) {
  let db = await database.open('./db/contactBook.db')
    .then(db => {
      console.log('Connected to the SQlite database.');
      return db;
    })
    .catch(err => {
      console.error(err.message);
    })
  
  const contact = req.body;
  console.log(contact);

  const result = await db.run(`INSERT INTO contacts(firstName, lastName, company, email, phone) VALUES(?,?,?,?,?)`, 
    [contact.firstName, contact.lastName, contact.company, contact.email, contact.phone]);

  res.status(200);
  db.close();
});

function getSqlFilter(search) {
  let filter = '';
  if(search) {
    // if contains only numbers or starts with + then search on phone number
    if(search.startsWith('+') || /^\d+$/.test(search)) {
      filter = "WHERE phone LIKE '%" + search + "%' ";
    } else {
      const searchWords = search.split(' ');
      const wordsFilters = searchWords.map(word => "(firstName LIKE '" + word + "%' or lastName LIKE '" + word + "%')");
      filter = "WHERE " + wordsFilters.join(' and ');
    }
  }
  return filter;
}

module.exports = router;
