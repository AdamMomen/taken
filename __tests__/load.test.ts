import k6 from "../__mocks__/k6";
import http from "../k6/http";

describe("multi-threading", () => {
  it("should start the benchmarking process", (done) => {
    const res = http.request(
      "GET",
      "https://postman-echo.com/get?foo1=bar1&foo2=bar2"
    );
    expect(res).toMatchSnapshot();
    done();
  });
});
