import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const errorHandler = require('./middleware/error');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect((uri as string));
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const userRouter = require('./routes/auth');
const privateRouter = require('./routes/private');
const bugRouter = require('./routes/bugs');
const companyRouter = require('./routes/company');

app.use('/api/User', userRouter);
app.use('/api/Private', privateRouter);
app.use('/api/Bug', bugRouter);
app.use('/api/Company', companyRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});