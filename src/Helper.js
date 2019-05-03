import axios from "axios";

export function loadContent(content, callback) {
  axios.get(content).then(response => {
    if (response && response.data) {
      callback(response.data);
    }
  });
}
