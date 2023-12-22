const http = require('http')
const express = require("express");
const app = express();
const socketIO = require('socket.io');
const cors = require("cors");
require('dotenv').config();

var dbfile = require('./xjexdwicz/db.js')
var encryptDecrypt = require('./helper/encryptDecrypt.js')
var middleware = require('./helper/middleware.js')
const authRoutes = require('./routes/authRoutes.js');
const user = require('./routes/userRoutes.js')
const dataseedRouters = require('./routes/seedRouter.js');
const adminroleAPi = require('./routes/adminroleAPis.js');





app.use(express.json());
app.use(cors());


app.use('/dataseed' , dataseedRouters) // Step 1 router
app.use('/auth', authRoutes); // SignIn or Login
app.use('/user',middleware.authcheck, user) // View Organization or (employee/user) details based role which is identified using on JWT token passed Headers
app.use('/employee',  middleware.rolecheck ,adminroleAPi) // View , Upd , dlt Apis

var server

server = http.createServer(app)



// const port = process.env.PORT || 3000
const port = 8083
server.listen(port, () => console.log(`Listening on ${port}`));


