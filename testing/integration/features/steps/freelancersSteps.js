const { Given, When, Then } = require("cucumber");
const assert = require("assert").strict;
const axios = require("axios");

Given("A freelancer email {string} exists", async function (email) {
  this.context = { email };
});

When("I send GET request to /search?search=", async function () {
  const path = "/search?search=";
  try {
    const response = await axios.get(
      `https://9yy4xr6sd3.execute-api.eu-central-1.amazonaws.com/dev/freelancers${path}${this.context.email}`
    );
    this.context.response = response;
  } catch (error) {
    console.error(error);
  }
});

Then(/^I receive (.*)$/, async function (expectedResponse) {
  assert.deepEqual(this.context.response.data, JSON.parse(expectedResponse));
});
