import { addNewReview, getAllReview } from '../controllers/reviewControllers.js';
import upload from '../middleware/upload.js';
// import { protect } from '../middleware/consumerAuth.js';

const routes = (app) => {
    // app.post('/review', upload.single('photo'), protect, addNewReview);
    // app.get('/review/:providerEmail', protect, getAllReview)
    app.post('/review', upload.single('photo'), addNewReview);
    app.get('/review/:providerEmail', getAllReview)
}

export default routes;