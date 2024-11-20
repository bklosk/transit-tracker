export default async function fetch_drives() {
  // specifies that this is a HTTP GET to a REST API
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // wait for server to send preflight request to GET request
  let response = await fetch(
    process.env.NEXT_PUBLIC_DISTANCE_URL +
      new URLSearchParams({
        origins: "1340 E 55th st, Chicago, IL 60615",
        destinations:
          "41.911475, -87.668961|41.943586, -87.654416|Schaumburg, IL",
        key: process.env.NEXT_PUBLIC_GOOGLE_KEY,
      }).toString(),
    requestOptions
  );

  // wait for server to fulfill promise (that is the actual lingo)
  let response_json = await response.json();

  // then, we serve the data through to the frontend
  return [
    response_json.rows[0].elements[0].duration.value,
    response_json.rows[0].elements[1].duration.value,
    response_json.rows[0].elements[2].duration.value,
  ];
}
