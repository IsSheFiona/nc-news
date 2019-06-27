process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app.js");
const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-sorted"));
const connection = require("../db/connection.js");

describe("/", () => {
  after(() => {
    connection.destroy();
  });
  beforeEach(() => connection.seed.run());
  describe("/api", () => {
    describe("/topics", () => {
      it("GET: status code 200, responds with an array of all topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).to.be.an("array");
            expect(body.topics[0]).to.contain.keys("description", "slug");
            expect(body.topics.length).to.equal(3);
          });
      });
      it("DELETE: responds with status 405 as this method is not allowed", () => {
        return request(app)
          .delete("/api/topics")
          .expect(405);
      });
    });
    describe("/users", () => {
      describe("/:username", () => {
        it("GET: status code 200, responds with a single user object", () => {
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
        it("PATCH: responds with status code 405 as this method is not allowed", () => {
          return request(app)
            .patch("/api/users/lurker")
            .expect(405);
        });
      });
    });
    describe("/articles", () => {
      it("GET: status code 200, responds with an array of all articles with the properties - author, title, article_id, topic, created_at, votes, comment_count (which is the total of all comments on the article)", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.contain.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      it("GET: returns an array of articles sorted by default by date in descending order", () => {
        return request(app)
          .get("/api/articles")
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy("created_at");
          });
      });
      it("GET: responds with an array of articles sorted according to requested criteria", () => {
        return request(app)
          .get("/api/articles?sort_by=title")
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy("title");
          });
      });
      it("GET: responds with an array of articles in ascending order when requested", () => {
        return request(app)
          .get("/api/articles?order=asc")
          .then(({ body }) => {
            expect(body.articles).to.be.sortedBy("created_at");
          });
      });
      it("GET: responds with status code 400, when passed a query to sort by an invalid column name", () => {
        return request(app)
          .get("/api/articles/?sort_by=not_a_column")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.be.equal("Invalid request.");
          });
      });
      it("GET: takes an author query which returns an array of articles filtered by author", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge")
          .then(({ body }) => {
            expect(body.articles.length).to.equal(3);
          });
      });
      it("GET: responds with an empty array when passed an author that does not exist", () => {
        return request(app)
          .get("/api/articles?author=i_am_not_an_author")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.eql([]);
          });
      });
      it("GET: responds with an empty array when passed an author who has no articles associated with them", () => {
        return request(app)
          .get("/api/articles?author=lurker")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.eql([]);
          });
      });
      it("GET takes an topic query which returns an array of articles filtered by topic", () => {
        return request(app)
          .get("/api/articles?topic=cats")
          .then(({ body }) => {
            expect(body.articles.length).to.equal(1);
          });
      });
      it("GET responds with an empty array when passed a topic that does not exist", () => {
        return request(app)
          .get("/api/articles?topic=i_am_not_a_topic")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.eql([]);
          });
      });
      it("GET: responds with an empty array when passed a topic that has no articles associated with it", () => {
        return request(app)
          .get("/api/articles?topic=paper")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.eql([]);
          });
      });
      it("GET: responds with a page of articles with a default limit set to 10", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles.length).to.equal(10);
          });
      });
      describe("/:article_id", () => {
        it("GET: status code 200, responds with a single article object", () => {
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
            });
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
        it("DELETE: responds with status code 405 as this method is not allowed", () => {
          return request(app)
            .delete("/api/articles/1")
            .expect(405);
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
                expect(body.comments).to.eql({
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
                expect(body.msg).to.equal("Not found.");
              });
          });
          it("POST: responds with status code 400, when passed an article_id in an invalid format", () => {
            return request(app)
              .post("/api/articles/notanarticle/comments")
              .send({
                username: "lurker",
                body: "This is the worst article I have ever read!!!"
              })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Invalid request.");
              });
          });
          it("POST: responds with status code 400, when passed a comment object containing a username that does not exist", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "i_am_not_a_user",
                body: "This is the worst article I have ever read!!!"
              })
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("Not found.");
              });
          });
          it("POST: responds with a status code of 200 when passed a comment object with an invalid key", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "i_am_not_a_user",
                some_words: "This is the worst article I have ever read!!!"
              })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Invalid request.");
              });
          });
          it("GET: status code 200, responds with an array of all comment objects associated with article", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.an("array");
                expect(body.comments[0]).to.contain.keys(
                  "comment_id",
                  "body",
                  "article_id",
                  "author",
                  "votes",
                  "created_at"
                );
                expect(body.comments.length).to.equal(13);
              });
          });
          it("GET: reponds with status code 200 and an empty array when passed an article_id with no comments", () => {
            return request(app)
              .get("/api/articles/2/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.an("array");
                expect(body.comments.length).to.equal(0);
              });
          });
          it("GET responds with an array of comments sorted by created_at by default in descending order", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .then(({ body }) => {
                expect(body.comments).to.be.descendingBy("created_at");
              });
          });
          it("GET responds with an array of comments sorted according to requested criteria", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=comment_id&&order=asc")
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("comment_id");
              });
          });
          it("GET responds with status code 400, when passed an invalid article_id", () => {
            return request(app)
              .get("/api/articles/not_an_article/comments")
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Invalid request.");
              });
          });
          it("GET responds with status code 400, when passed a query to sort by an invalid column name", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=not_a_column")
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.be.equal("Invalid request.");
              });
          });
          it("GET responds with status code 200 and sorts by default column in descending order when passed an invalid order", () => {
            return request(app)
              .get("/api/articles/1/comments?order=backwards")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.descendingBy("created_at");
              });
          });
        });
      });
      describe("/comments", () => {
        describe("/:comment_id", () => {
          it("PATCH status 200: accepts an object in the form { inc_votes: newVote } and increments or decrements the vote property of the comment by the value of newVote", () => {
            return request(app)
              .patch("/api/comments/17")
              .send({
                inc_votes: 12
              })
              .expect(200)
              .then(({ body }) => {
                expect(body.comment.votes).to.eql(32);
              });
          });
          it("PATCH: responds with status code 404, when passed a comment_id that does not exist ", () => {
            return request(app)
              .patch("/api/comments/500")
              .send({
                inc_votes: 12
              })
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("Comment not found.");
              });
          });
          it("PATCH: responds with status code 400, when passed a comment_id in an invalid format", () => {
            return request(app)
              .patch("/api/articles/notacomment")
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
              .patch("/api/comments/17")
              .send({
                inc_votes: "i am not a number"
              })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Invalid request.");
              });
          });
          it("PATCH: responds with status code 200 and returns an unchanged comment, when passed a vote object with an invalid key", () => {
            return request(app)
              .patch("/api/comments/17")
              .send({
                i_am_the_wrong_key: 12
              })
              .expect(200)
              .then(({ body }) => {
                expect(body.comment.votes).to.eql(20);
              });
          });
          it("DELETE: responds with 204 and deletes a comment", () => {
            return request(app)
              .delete("/api/comments/18")
              .expect(204);
          });
          it("DELETE: responds with 404 when passed a comment_id which does not exist", () => {
            return request(app)
              .delete("/api/comments/99")
              .expect(404);
          });
          it("DELETE: responds with 400 when passed an invalid comment_id", () => {
            return request(app)
              .delete("/api/comments/not_a_comment_id")
              .expect(400);
          });
        });
      });
    });
  });
});
