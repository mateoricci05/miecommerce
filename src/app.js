import express from 'express';
import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new IOServer(httpServer);

// Make io available to routes via app.set
app.set('io', io);

app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, '../views/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);

// Socket.io connection handling
io.on('connection', socket => {
  console.log('Nuevo cliente conectado:', socket.id);

  socket.on('newProduct', (product) => {
    io.emit('updateProductsRequest', { source: 'socket', product });
  });

  socket.on('deleteProduct', (id) => {
    io.emit('deleteProductRequest', { source: 'socket', id });
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
