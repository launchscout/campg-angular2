/* Define custom server-side HTTP routes for lineman's development server
 *   These might be as simple as stubbing a little JSON to
 *   facilitate development of code that interacts with an HTTP service
 *   (presumably, mirroring one that will be reachable in a live environment).
 *
 * It's important to remember that any custom endpoints defined here
 *   will only be available in development, as lineman only builds
 *   static assets, it can't run server-side code.
 *
 * This file can be very useful for rapid prototyping or even organically
 *   defining a spec based on the needs of the client code that emerge.
 *
 */

var express = require('express');
var cors = require('cors');

var _ = require("underscore");

var candidates = [
  {id: 1, name: "John Doe", email: "john.doe@example.com", rating: 1},
  {id: 2, name: "Jane Doe", email: "jane.doe@example.com", rating: 4},
];

function findCandidate(id) {
  return _.findWhere(candidates, {id: Number(id)});
}

function createCandidate(candidate) {
  candidate.id = candidates.length + 1;
  candidates.push(candidate);
  return candidate;
}

var app = express();

app.use(cors());

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/login', function(req, res) {
  res.json({ message: 'logging in!' });
});

app.post('/logout', function(req, res) {
  res.json({ message: 'logging out!'});
});

app.get('/candidates', function (req, res) {
  res.json(candidates);
});

app.get('/candidates/:id', function (req, res) {
  res.json(findCandidate(req.params.id));
});

app.post("/candidates", function(req, res) {
  console.log(req.body);
  res.json(createCandidate(req.body));
});

app.post("/candidates/:id", function(req, res) {
  candidate = findCandidate(req.params.id);
  _.extend(candidate, req.body);
  res.json(candidate);
});

app.listen(8000, function () {
  console.log('Server running on port 8000');
});
