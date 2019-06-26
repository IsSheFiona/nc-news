process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app.js");
const chai = require("chai");
const { expect } = chai;
const connection = require("../db/connection.js");

describe("/", () => {
  after(() => {
    connection.destroy();
  });
  beforeEach(() => connection.seed.run());
  describe("/api", () => {
    describe("/topics", () => {
      it("GET status code 200, responds with an array of all topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).to.be.an("array");
            expect(body.topics[0]).to.contain.keys("description", "slug");
            expect(body.topics.length).to.equal(3);
          });
      });
    });
    describe("/users", () => {
      describe("/:username", () => {
        it("GET status code 200, responds with a single user object", () => {
          return request(app)
            .get("/api/users/lurker")
            .expect(200)
            .then(({ body }) => {
              expect(body.user).to.contain.keys(
                "username",
                "avatar_url",
                "name"
              );
              expect(body.user.username).to.equal("lurker");
            });
        });
        it("GET: responds with status code 404, when passed a username that does not exist ", () => {
          return request(app)
            .get("/api/users/not_a_username")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal(
                "Sorry, this is not a registered user."
              );
              // if time, look at adding limitations to the characters that can be included in a username
            });
        });
      });
    });
    describe("/articles", () => {
      describe("/:article_id", () => {
        it("GET status code 200, responds with a single article object", () => {
          return request(app)
            .get("/api/articles/9")
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.contain.keys(
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              );
              expect(body.article.article_id).to.equal(9);
              expect(body.article.comment_count).to.equal("2");
            }); // do error handling for article by id
        });
        it("GET: responds with status code 404, when passed an article_id that does not exist ", () => {
          return request(app)
            .get("/api/articles/500")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Article not found.");
            });
        });
        it("GET: responds with status code 400, when passed an article_id in an invalid format", () => {
          return request(app)
            .get("/api/articles/notanarticle")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Invalid request.");
            });
        });
        it("PATCH status 200: accepts an object in the form { inc_votes: newVote } and increments or decrements the vote property of the article by the value of newVote", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({
              inc_votes: 12
            })
            .expect(200)
            .then(({ body }) => {
              expect(body.article.votes).to.eql(112);
            });
        });
        it("PATCH: responds with status code 404, when passed an article_id that does not exist ", () => {
          return request(app)
            .patch("/api/articles/500")
            .send({
              inc_votes: 12
            })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Article not found.");
            });
        });
        it("PATCH: responds with status code 400, when passed an article_id in an invalid format", () => {
          return request(app)
            .patch("/api/articles/notanarticle")
            .send({
              inc_votes: 12
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Invalid request.");
            });
        });
        it("PATCH: responds with status code 400, when passed a vote object in an invalid format", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({
              inc_votes: "i am not a number"
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Invalid request.");
            });
        });
        it("PATCH: responds with status code 200 and returns an unchanged article, when passed a vote object with an invalid key", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({
              i_am_the_wrong_key: 12
            })
            .expect(200)
            .then(({ body }) => {
              expect(body.article.votes).to.eql(100);
            });
        });
        describe("/comments", () => {
          it("POST: status 201, adds a new comment to an article, responds with the posted comment", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "lurker",
                body: "This is the worst article I have ever read!!!"
              })
              .expect(201)
              .then(({ body }) => {
                expect(body.comment).to.eql({
                  comment_id: 19,
                  body: "This is the worst article I have ever read!!!",
                  article_id: 1,
                  author: "lurker",
                  votes: 0,
                  created_at: "???"
                });
              });
          });
          it("POST: responds with status code 404, when passed an article_id that does not exist ", () => {
            return request(app)
              .post("/api/articles/500/comments")
              .send({
                username: "lurker",
                body: "This is the worst article I have ever read!!!"
              })
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("Article not found.");
              });
          });
        });
      });
    });
  });
});

//   { 9
//     title: "They're not exactly dogs, are they?",
//       topic: 'mitch',
//         author: 'butter_bridge',
//           body: 'Well? Think about it.',
//             created_at: 533132514171,
