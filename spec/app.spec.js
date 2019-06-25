process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app.js");
const chai = require("chai");
const { expect } = chai;
const connection = require("../db/connection.js");

describe("/", () => {
  after(() => {
    connection.destroy();
    beforeEach(() => connection.seed.run());
    describe("/api", () => {
      describe("/topics", () => {
        it("GET status code 200, response with an array of topic", () => {
          return request(app)
            .get("/api/topics")
            .expect(200);
          // .then(({ body }) => {
          //   expect(body.treasures).to.be.an("array");
          //   expect(body.treasures[0]).to.contain.keys(
          //     "treasure_id",
          //     "treasure_name",
          //   );
          // });
        });
      });
    });
  });
});
