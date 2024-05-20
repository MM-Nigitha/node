const express = require('express');
const app = express();

const usersRoute = require('./routes/employee'); 

app.use(express.json());

app.use('/user', usersRoute);

const studentInfoRoute=require('./routes/studentinfo_route')

app.use(express.json());

app.use('/Students', studentInfoRoute);

const port =3001
app.listen(port, () => {
  console.log(`Connected Successfully`);
});
