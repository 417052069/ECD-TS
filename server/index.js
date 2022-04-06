const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
const posts = require('./routes/api/post')


app.use("/api/posts",posts)
const port = process.env.PORT || 4500;
app.listen(port,console.log(`Server started on port ${port}`));