const fetch = require("node-fetch");

// Take a signal parameter in the function that needs cancellation
async function somethingIWantToCancel({ signal } = {}) {
  console.log(signal, "취소시그널~");
  // either pass it directly to APIs that support it
  // (fetch and most Node APIs do)
  const response = await fetch("https://example.com/", { signal });
  console.log(response.status, "**");
  // return response.json;

  // or if the API does not already support it -
  // manually adapt your code to support signals:
  const onAbort = (e) => {
    // run any code relating to aborting here
  };
  signal.addEventListener("abort", onAbort, { once: true });
  // and be sure to clean it up when the action you are performing
  // is finished to avoid a leak
  // ... sometime later ...
  signal.removeEventListener("abort", onAbort);
}

// Usage
const ac = new AbortController();
(async function cencelTest() {
  try {
    setTimeout(() => {
      console.log("취소요청 보냄");
      ac.abort();
    }, 5000); // give it a 1s timeout setTimeout(() => {}, 1000): 1초안에 응답안오면 취소할꺼야!!

    await somethingIWantToCancel({ signal: ac.signal });
  } catch (e) {
    if (e.name === "AbortError") {
      // deal with cancellation in caller, or ignore
    } else {
      throw e; // don't swallow errors :)
    }
  }
})();
