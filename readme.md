**NC News**
An express server providing data to a reddit clone. A sql database has been seeded and interactions with the server take place using Postgres. Queries are built using knex.

_Endpoints_

- /topics GET serves a list of all available topics
- /users/:username GET responds with the details of a particular user
- /articles GET serves a list of all available articles
- /articles/:article_id GET reponds with all the data from a single article
- /articles/:article_id PATCH allows votes to be added to an article
- /articles/:article_id/comments POST allows the addition of a new comment to an article
- /articles/:article_id/comments GET responds with all comments for the requested article
- /comments/:comment_id PATCH allows votes to be added to a comment
- /comments/:comment_id DELETE deletes a comment

_Testing_
The server was built with full TDD using mocha and chai.

_Author_
Fiona Fairbairn

_Acknowledgments_
Thanks to all at Northcoders for providing data, inspiration, and education.
