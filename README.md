## How to run

In main folder:
npm install
PORT=3001 node bin/www

In contacts-book-app:
npm install
npm start

## Search Logic

If starts with '+' or contains only number - search on phone number otherwise search on name.

Searching on name works like the iPhone contacts search, 
break into words and for each word: like 'WORD%' on first name or last name

will the search return 'Ido Ganzer'?
1. 'Id' - yes
2. 'ga' - yes
3. 'id ga' - yes
4. 'ganz ido' - yes
5. 'do' - no
6. 'anzer' - no
7. 'Ganz Id Ganz' - yes 

## Improvemnets

1. Input validation
2. Edit/Delete Contact
3. Photo upload
4. Support phone search for both +97250432.. and 050432.. formats
5. Tests
