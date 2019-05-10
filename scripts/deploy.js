var ghpages = require("gh-pages");
ghpages.publish("dist", function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log("deployed successfully.");
  }
});
