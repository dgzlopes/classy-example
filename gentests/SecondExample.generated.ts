import http from "k6/http";
import { check, sleep } from "k6";
import { type k6Test, type k6TestOptions, scenario } from "classy-k6";

const BASE_URL = "https://test.k6.io";

export function hello() {
  console.log(`Hello ${BASE_URL}`);
}

export const options = {
  ...{},
  scenarios: {
    hello: {
      executor: "constant-vus",
      exec: "hello",
      ...{ vus: 1, duration: "10s" }
    },
  }
};
