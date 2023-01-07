import http from "k6/http";
import sleep from "k6";

const TEST_URL_LAMBDA =
  "https://mgy1bptvua.execute-api.us-east-1.amazonaws.com/dev/placeOrder";

export let options = {
  noConnectionReuse: false,
  vus: 10,
  duration: "30s",
};

export default function () {
  http.post(
    TEST_URL_LAMBDA,
    JSON.stringify({
      userId: "2",
      name: "iPhone",
      price: "9",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "d7ZLYr3Ztb20tdoyvPwa1HWEgWnitpV5ijtRjNmj",
      },
    }
  );
  sleep(5);
}
