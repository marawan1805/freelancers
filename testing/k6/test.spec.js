import http from "k6/http";
import { check, sleep } from "k6";

// Configure our test to hit the URL at a rate of 10 VUs for 5 seconds
// which will result in 50 total requests to the URL being hit during the test
// which is a total of 50 seconds of load testing (10 VUs * 5 seconds)
export const options = {
  duration: "5s",
  vus: 10,
};

export default function () {
  const res = http.get(
    "https://9yy4xr6sd3.execute-api.eu-central-1.amazonaws.com/dev/freelancers/search?search=s"
  );
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}
