const { expect } = require("chai");
const { formatDate, makeRefObj, formatComments } = require("../db/utils/utils");

describe("formatDate", () => {
  it("returns an empty array when passed an empty array", () => {
    const input = [];
    const actual = formatDate(input);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("returns one object with a correctly formatted timestamp when passed an array of one object which includes a unix timestamp", () => {
    const input = [
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171
      }
    ];
    const actual = formatDate(input);
    const expected = [
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: "Tue, 19 Nov 2002 12:21:54 GMT"
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("returns an array of multiple objects with correctly formatted timestamps when passed an array of multiple objects which include a unix timestamp", () => {
    const input = [
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    const actual = formatDate(input);
    const expected = [
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: "Tue, 19 Nov 2002 12:21:54 GMT"
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: "Wed, 17 Nov 2010 12:21:54 GMT"
      }
    ];
    expect(actual).to.eql(expected);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object when passed an empty array", () => {
    const input = [];
    const actual = makeRefObj(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it("returns a reference object with one key value pair when passed an array containing one item", () => {
    const input = [
      {
        article_id: 12,
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171
      }
    ];
    const actual = makeRefObj(input);
    const expected = { "UNCOVERED: catspiracy to bring down democracy": 12 };
    expect(actual).to.eql(expected);
  });
  it("returns a reference object with multiple key value pairs when passed an array containing multiple items", () => {
    const input = [
      {
        article_id: 12,
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171
      },
      {
        article_id: 99,
        title: "They're not exactly dogs, are they?",
        topic: "mitch",
        author: "butter_bridge",
        body: "Well? Think about it.",
        created_at: 533132514171
      }
    ];
    const actual = makeRefObj(input);
    const expected = {
      "UNCOVERED: catspiracy to bring down democracy": 12,
      "They're not exactly dogs, are they?": 99
    };
    expect(actual).to.eql(expected);
  });
});

describe("formatComments", () => {
  it("returns an empty array when passed an empty array", () => {
    const input = [];
    const actual = formatComments(input);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("renames the `created_by` property to `author`", () => {
    const comments = [{ created_by: "butter_bridge" }];
    const actual = formatComments(comments);
    // const expected = [{ author: "butter_bridge" }];
    expect(actual[0]).to.include({ author: "butter_bridge" });
    expect(actual[0]).to.not.include.keys("created_by");
  });
  it("renames the `belongs_to` property to `article_id`", () => {
    const comments = [{ belongs_to: "They're not exactly dogs, are they?" }];
    const actual = formatComments(comments);
    expect(actual[0]).to.include.keys("article_id");
    expect(actual[0]).to.not.include.keys("belongs_to");
  });
  it("gives the correct id correcpsponding to the original title to the new article_id", () => {
    const comments = [{ belongs_to: "They're not exactly dogs, are they?" }];
    const articleRef = { "They're not exactly dogs, are they?": 99 };
    const actual = formatComments(comments);
    expect(actual[0]).to.include({ article_id: 99 });
  });
});

// The value of the new `article_id` key must be the id corresponding to the original title value provided
