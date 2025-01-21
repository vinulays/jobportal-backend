import { addNewProvider, authentication, getProviderById, updateProvider } from '../controllers/providerControllers.js'
import upload from '../middleware/upload.js'

const routes = (app) => {
    app.post('/signup/provider', upload.single('photo'), addNewProvider);

    app.post('/login/provider', upload.single('photo'), authentication);
    app.get('/provider/:providerId', getProviderById);
    app.put('/provider/:providerId', upload.single('photo'), updateProvider)
}


export default routes;