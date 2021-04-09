Movie Mondays
=============

Fetch session times
-------------------

Makes a request to the session times page and writes the response to stdout.

    $ npm run fetch -s | less
    $ npm run fetch -s > "./test/res/$(date +'%F_%H-%M').html"

Parse session times
-------------------

Reads a session times page from stdin and extracts film and session information.

    $ npm run parse -s < ./test/res/2021-04-08_18-59.html
    $ npm run fetch -s | npm run parse -s

Create database
---------------

Initializes a new SQLite database at the given path.

    $ npm run db-create -- foo.sqlite

Insert data
-----------

Puts session data into a SQLite database at the given path.

    $ npm run db-insert -- database.sqlite < parsed-data.json
    $ npm run fetch -s | npm run parse -s | npm run db-insert -- foo.sqlite

Update database
---------------

Performs a fetch, parse and database insert all in one step.

    $ npm run db-update -- database.sqlite
