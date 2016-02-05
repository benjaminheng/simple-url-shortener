# Simple URL Shortener

## Technical details

- A sqlite3 database is used to store the URLs
    - Database is in-memory as a proof-of-concept.
    - Schema: `id integer, url text`
- The following method is used to generate the shortened IDs: http://stackoverflow.com/questions/742013/how-to-code-a-url-shortener
    - Basically, the url is added to the database. The row's ID is autogenerated by sqlite3. I take this row ID and convert it to a base-62 encoded string. This string is used as the short URL.
    - One limitation of this method is that shortened URLs are somewhat predictable (`aaa` will be `aab` next)
    - I [initialize the autoincrement](https://github.com/benjaminheng/simple-url-shortener/blob/2bd6e3e33da6fd550e13c7c1a785c6cf440aff7b/app/server/server.js#L20) to `1234567` so it won't start generating from 1='a', 2='b' and so on.

## Usage

```
npm install
npm run start
```
