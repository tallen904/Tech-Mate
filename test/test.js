const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

nightmare
.goto('localhost:8080/employee/')
.wait(5000)
.end()
.then(function(result) {
  console.log(result);
})
.catch(function(error) {
  console.error("Search failed:", error);
});