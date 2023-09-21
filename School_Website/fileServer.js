const express = require('express');
const fs = require('fs');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 5555;

// sendFile will go here
/* app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
  res.sentfile(course(context))
}); */

app.post('/save', (req, res) => {
  const  text  = req.body.data;
console.log(req)

  if (!text) {
    res.status(400).send('Text data is required');
    return;
  }
 
  fs.appendFile('JavaScript/dataUsers.txt', text + '\n', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving data');
    } else {
      res.send('Data saved successfully');
    }    
  });
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});