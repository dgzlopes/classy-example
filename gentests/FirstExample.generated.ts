import http from "k6/http";
import { check, sleep } from "k6";
import { type k6Test, type k6TestOptions, scenario } from "classy-k6";

const BASE_URL = "https://test.k6.io";

export function setup() {
  console.log("Setting up resources...");
  return { id: 123 };
}

export function teardown() {
  console.log("Cleaning up with data:");
}

export function homepage() {
  console.log(`Visiting homepage: ${BASE_URL}`);
  const res = http.get(`${BASE_URL}/`);
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(1);
}

export function logSetupData(data: { id: number }) {
  console.log(`The ID is: ${data.id}`);
  sleep(1);
}

export const options = {
  ...{
    cloud: { project: "my-project" },
    thresholds: { http_req_duration: ["p(95)<200"] }
  },
  scenarios: {
    homepage: {
      executor: "constant-vus",
      exec: "homepage",
      ...{ vus: 2, duration: "10s" }
    },
    logSetupData: {
      executor: "constant-vus",
      exec: "logSetupData",
      ...{ vus: 1, duration: "15s" }
    },
  }
};
