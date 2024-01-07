// Switch to or create a new database named 'mydatabase'
`use('mydatabase')`;

// Insert a document into a collection named 'mycollection'
db.mycollection.insertOne({
  name: "John Doe",
  age: 25,
  city: "Example City",
});

// Find all documents in 'mycollection'
db.mycollection.find();



