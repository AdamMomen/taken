import request from "supertest";
import express from "express";
import config from "../src/config";
import routes from "../src/api";
import { strict as assert } from "assert";
import bodyParser from "body-parser";
const app = express();

beforeAll(() => {
  process.env.NODE_ENV = "test";
});
describe("it should initialize express server ", () => {
  it("should 200 on /status", (done) => {
    app.get("/status", (_, res) => {
      res.status(200).end();
    });
    app.use(bodyParser.json());
    app.use(routes());
    request(app).get("/status").expect(200, done);
  });

  it("should fail on sending incorrect url as query param", (done) => {
    request(app)
      .get("/image/capture?url=test.com")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body.success).toBeFalsy();
      });
    done();
  });
});
