export default async function fetch_train() {
  // specifies that this is a HTTP GET to a REST API
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // wait for server to send preflight request to GET request to providers
  let response = await fetch(
    process.env.NEXT_PUBLIC_TRAIN_URL +
      new URLSearchParams({
        key: process.env.NEXT_PUBLIC_TRAIN_KEY,
        outputType: "JSON",
        stpid: [30099, 30223],
      }).toString(),
    requestOptions
  );

  // wait for server to fulfill promise (that is the actual lingo)
  let response_json = await response.json();

  // then, we serve the data through to the frontend
  return response_json.ctatt.eta;
}
