import http from "k6/http";
import { check, sleep } from "k6";
import { type k6Test, type k6TestOptions, scenario } from "classy-k6";

const BASE_URL = "https://test.k6.io";

export class FirstExample implements k6Test {
  options: k6TestOptions = {
    cloud: { projectID: "my-project" },
    thresholds: { http_req_duration: ["p(95)<200"] }
  };

  setup() {
    console.log("Setting up resources...");
    return { id: 123 };
  }

  @scenario({ vus: 2, duration: "10s" })
  homepage() {
    console.log(`Visiting homepage: ${BASE_URL}`);
    const res = http.get(`${BASE_URL}/`);
    check(res, { "status is 200": (r) => r.status === 200 });
    sleep(1);
  }

  @scenario({ vus: 1, duration: "15s" })
  logSetupData(data: { id: number }) {
    console.log(`The ID is: ${data.id}`);
    sleep(1);
  }

  teardown() {
    console.log("Cleaning up with data:");
  }
}

export class SecondExample implements k6Test {
  options: k6TestOptions = {};

  @scenario({ vus: 1, duration: "10s" })
  hello() {
    console.log(`Hello ${BASE_URL}`);
  }
}