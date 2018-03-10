const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

nightmare
.goto('localhost:8080/')
.click('#company-btn')
.type('#name', 'Company Name')
.type('#email', 'company@email.com')
.type('#telephone', '1234567890')
.type('#website', 'https://www.website.com')
.click('.submit')
.wait(5000)
.end()
.then(function(result) {
  console.log(result);
})
.catch(function(error) {
  console.error("Search failed:", error);
});