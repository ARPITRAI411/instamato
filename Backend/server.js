require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
const port = process.env.PORT || 3000 
// Connect to the database
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})