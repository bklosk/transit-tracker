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
          "41.911475, -87.668961|Lake View East, Chicago, IL|Schaumburg, IL|Hinsdale, IL",
        key: process.env.NEXT_PUBLIC_GOOGLE_KEY,
        departure_time: "now",
      }).toString(),
    requestOptions
  );

  // wait for server to fulfill promise (that is the actual lingo)
  let response_json = await response.json();

  // return the JSON object
  return {
    Bucktown: response_json.rows[0].elements[0].duration_in_traffic.value,
    Lakeview: response_json.rows[0].elements[1].duration_in_traffic.value,
    Schaumburg: response_json.rows[0].elements[2].duration_in_traffic.value,
    Hinsdale: response_json.rows[0].elements[3].duration_in_traffic.value,
  };
}
