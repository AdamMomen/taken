import bodyParser from "body-parser";
import express from "express";
import request from "supertest";
import routes from "../src/api";
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
      .post("/image/capture")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body.success).toBeFalsy();
      });
    done();
  });
});
