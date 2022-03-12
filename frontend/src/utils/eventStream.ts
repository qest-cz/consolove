import { fetchEventSource } from "@microsoft/fetch-event-source";
import db from "./db";

const registerStreamListener = () => {
  const fetchData = async () => {
    await fetchEventSource(`http://localhost:1234`, {
      method: "GET",
      headers: {
        Accept: "text/event-stream",
      },

      // @ts-ignore
      onopen(res) {
        if (res.ok && res.status === 200) {
          console.log("Connection made ", res);
        } else if (
          res.status >= 400 &&
          res.status < 500 &&
          res.status !== 429
        ) {
          console.log("Client side error ", res);
        }
      },
      onmessage(event) {
        const parsedData = JSON.parse(event.data);
        db.logs.add(parsedData);

        // setData((data) => [...data, parsedData]);
        console.log('data recieved: ', parsedData);
      },
      onclose() {
        console.log("Connection closed by the server");
      },
      onerror(err) {
        console.log("There was an error from server", err);
      },
    });
  };
  fetchData()
}

export default registerStreamListener
