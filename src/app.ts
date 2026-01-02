import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import chatRoutes from './routes/chatRoutes';

const app = express();

app.use(express.json());

// Routes
app.use('/', chatRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;