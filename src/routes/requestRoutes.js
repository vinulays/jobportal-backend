import upload from '../middleware/upload.js';
import {
    addJobRequest,
    getAllJobRequests,
    getAllRequestByProvider,
    getAllRequestByConsumer,
    updateRequest
} from '../controllers/requestController.js'
// import { protect } from '../middleware/consumerAuth.js';

const routes = (app) => {
    // app.post('/jobrequests', upload.single('files'), protect, addJobRequest);
    // app.get('/jobrequests', protect, getAllJobRequests);

    app.post('/jobrequests', upload.single('files'), addJobRequest);
    app.get('/jobrequests', getAllJobRequests);
    app.get('/jobrequests/provider/:providerEmail', getAllRequestByProvider);
    app.get('/jobrequests/consumer/:consumerEmail', getAllRequestByConsumer);
    app.put('/jobrequests', updateRequest)
}

export default routes;
