import trip_schedule from "../assets/trip_schedule";
export default async function fetch_metra() {
  // specifies that this is a HTTP GET to a REST API
  let headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " +
      Buffer.from(
        process.env.NEXT_PUBLIC_METRA_U + ":" + process.env.NEXT_PUBLIC_METRA_P
      ).toString("base64")
  );

  // wait for server to send preflight request to GET request to providers
  let trips = await fetch(
    process.env.NEXT_PUBLIC_METRA_TRIPS + new URLSearchParams({}).toString(),
    { method: "get", headers: headers }
  );

  // wait for server to fulfill promise (that is the actual lingo)
  let trips_response = await trips.json();
  var me_trains = trips_response.filter(
    (element) => element.trip_update.trip.route_id == "ME"
  );
  var me_trips = trip_schedule.filter((element) => element.route_id == "ME");

  var nb_me_trains = [];
  for (let train of me_trains) {
    for (let stop of train.trip_update.stop_time_update) {
      var me_trip = me_trips.find(
        (element) => element.trip_id == train.trip_update.trip.trip_id
      );
      console.log(me_trip);
      if (stop.stop_id == "55-56-57TH") {
        nb_me_trains.push({
          vehicle: train.trip_update.vehicle.id,
          trip: train.trip_update.trip.trip_id,
          arrival: stop.arrival.time.low,
          delay: train.trip_update.delay,
          alert: train.alert,
          label: train.trip_update.vehicle.label,
          direction: me_trip.direction_id,
          trip_headsign: me_trip.trip_headsign,
        });

        break;
      }
    }
  }

  return nb_me_trains;
}
