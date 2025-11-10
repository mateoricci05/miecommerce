import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Handlebars setup
import { engine } from 'express-handlebars';
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/entrega_final';

mongoose.connect(MONGODB_URI)
  .then(()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
