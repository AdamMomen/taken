import bodyParser from "body-parser";
import express from "express";
import request from "supertest";
import routes from "../src/api";

describe("it should initialize express server ", () => {
  const app = express();
  beforeAll(() => {
    process.env.NODE_ENV = "test";
    app.use(bodyParser.json());
    app.use(routes());
  });

  it("should fail on sending incorrect url as query param", (done) => {
    request(app)
      .post("/image/capture")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toBe(
          "Error: Missing URL filed, Please provide a url"
        );
      });
    done();
  });

  it("should fail on incorrect url paramater", (done) => {
    request(app)
      .post("/image/capture")
      .send({ url: "thisIsnotGoodWebsite" })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toBe(
          "Error: Please provide a valid url, maybe missing http:// or https://?"
        );
      });
    done();
  });
});
