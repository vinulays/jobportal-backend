import { findByJobID, addNewJob, getAllJob, findJobByEmail, updateJobById, deleteJobById } from '../controllers/jobControllers.js';
import upload from '../middleware/upload.js';
// import { protect } from '../middleware/providerAuth.js';


const routes = (app) => {
    // app.post('/job', upload.single('photo'), protect, addNewJob);

    // app.route('/job/:jobID')
    //     .get(findByJobID);

    // app.get('/job', getAllJob);

    // app.get('/job/provider/:providerEmail', protect, findJobByEmail);

    // app.put('/job/:jobID', upload.single('photo'), protect, updateJobById);

    // app.delete('/job/:jobID', protect, deleteJobById);
    app.post('/job', upload.single('photo'), addNewJob);

    app.route('/job/:jobID')
        .get(findByJobID);

    app.get('/job', getAllJob);

    app.get('/job/provider/:providerEmail', findJobByEmail);

    app.put('/job/:jobID', upload.single('photo'), updateJobById);

    app.delete('/job/:jobID', deleteJobById);
}

export default routes;