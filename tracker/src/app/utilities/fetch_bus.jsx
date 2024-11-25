export default async function fetch_bus() {
  // specifies that this is a HTTP GET to a REST API
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // wait for server to send preflight request to GET request to providers
  let response = await fetch(
    process.env.NEXT_PUBLIC_BUS_URL +
      new URLSearchParams({
        key: process.env.NEXT_PUBLIC_BUS_KEY,
        format: "json",
        rt: [55, 171],
        stpid: [17563, 10570],
      }).toString(),
    requestOptions
  );

  // wait for server to fulfill promise (that is the actual lingo)
  let response_json = await response.json();

  // then, we serve the data through to the frontend
  return response_json["bustime-response"].prd;
}
