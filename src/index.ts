import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/config';
import router from './router/index';
import morgan from 'morgan';

const app = express();


const PORT = config.env.PORT;
const customFormat = ':method :url :status :response-time ms - :res[content-length]';

// Middleware
app.use(express.json());

app.use(morgan(customFormat));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from API!');
});
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

