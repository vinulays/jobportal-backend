import { addNewConsumer, authentication } from '../controllers/consumerControllers.js'
import upload from '../middleware/upload.js';

const routes = (app) => {
    app.post('/signup/consumer', upload.single('photo'), addNewConsumer);

    app.post('/login/consumer', upload.single('photo'), authentication);
}

export default routes;