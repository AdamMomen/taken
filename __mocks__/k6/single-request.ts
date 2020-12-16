import http from "k6/http";
import { sleep, check } from "k6";
import { Counter } from "k6/metrics";
// A simple counter for http requests
export const requests = new Counter("http_reqs");
// you can specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for
export const options = {
  stages: [
    { target: 1000, duration: "1m" },
    { target: 1500, duration: "1m" },
    { target: 0, duration: "1m" },
  ],
  thresholds: {
    requests: ["count < 100"],
  },
};
export default function () {
  // our HTTP request, note that we are saving the response to res, which can be accessed later
  const res = http.get("http://localhost:5555/status");
  sleep(1);
  const checkRes = check(res, {
    "status is 200": (r) => r.status === 200,
    //@ts-ignore
    "response body": (r) => r.body.indexOf("Feel free to browse") !== -1,
  });
}