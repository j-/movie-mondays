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
