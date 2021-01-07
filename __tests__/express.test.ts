import bodyParser from "body-parser";
import express, { Express } from "express";
import request from "supertest";
import { Connection } from "typeorm";
import routes from "../src/api";
import connection from "../src/utils/connection";

describe("it should initialize express server ", () => {
  let app: Express;
  let conn: Connection;

  beforeAll(async () => {
    app = express();
    jest.useFakeTimers();
    process.env.NODE_ENV = "test";
    app.use(bodyParser.json());
    await app.use(routes());
  });

  it("should fail on sending incorrect url as query param", async (done) => {
    request(app)
      .post("/image/capture")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .then((res) => {
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toBe(
          "Error: Missing URL filed, Please provide a url"
        );
      });
    done();
  });

  it("should fail on incorrect url paramater", async (done) => {
    request(app)
      .post("/image/capture")
      .send({ url: "thisIsnotGoodWebsite" })
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .then((res) => {
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toBe(
          "Error: Please provide a valid url, maybe missing http:// or https://?"
        );
      });
    done();
  });
});
