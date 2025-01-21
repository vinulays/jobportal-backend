import { checkNullOrUndefined } from '../middleware/validation.js';
import { JobRequest } from '../models/requestModel.js'
import { findUserByEmail } from '../middleware/validation.js'
import { Consumer } from '../models/consumerModel.js'
import { Provider } from '../models/providerModel.js'

// Controller to add a new job request
export const addJobRequest = async (req, res) => {
    try {
        const { description, job, date, consumerId, providerId, isAccepted } = req.body;
        const evaluateStrings = [description, job, consumerId, providerId].map(checkNullOrUndefined);
        const isValidate = evaluateStrings.every((value) => value === true)

        // You can add additional validation here if required
        if (isValidate) {
            const jobRequest = new JobRequest({
                description: description,
                job: job,
                date: new Date(date),
                consumer: consumerId,
                provider: providerId,
                isAccepted: isAccepted
            });

            await jobRequest.save();
            res.status(201).json(jobRequest);
        }
        else {
            res.status(422).json({
                description: evaluateStrings[0] ? description : "Error",
                job: evaluateStrings[1] ? job : "Error",
                consumerId: evaluateStrings[2] ? consumerId : "Error",
                providerId: evaluateStrings[3] ? providerId : "Error",
            });
        }

    } catch (error) {
        if (error instanceof RangeError) {
            res.status(500).json("Error: The provided date is out of range.");
        } else if (error instanceof SyntaxError) {
            res.status(500).json("Error: Invalid date format.");
        } else {
            res.status(500).json("Error: An unexpected error occurred while parsing the date.");
        }
    }

};

// Controller to get all job requests
export const getAllJobRequests = async (req, res) => {
    try {
        const jobRequests = await JobRequest.find();
        jobRequests.sort((a, b) => b.date - a.date);
        jobRequests.length !== 0
            ? res.status(200).json(jobRequests)
            : res.status(404).json({ message: 'Requests not found' });;
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getAllRequestByConsumer = async (req, res) => {

    const { consumerEmail } = req.params;
    const consumer = await findUserByEmail(consumerEmail, Consumer);

    try {
        if (consumer) {
            const requests = await JobRequest.find({ consumer: consumer._id })
                .populate('consumer') // Populate the 'consumer' field with the corresponding object
                .populate('provider'); // Populate the 'provider' field with the corresponding object

            if (requests.length !== 0) {
                requests.sort((a, b) => b.date - a.date);
                res.status(200).json(requests);
            }
            else res.status(404).json({ error: 'Not Found Any Requests' });

        }
        else res.status(404).json({ message: 'Consumer not found' });
    } catch (err) {

        console.error('Error fetching job requests:', err);
        res.status(500).json({ error: 'Unable to fetch job requests' });
    }
}


export const getAllRequestByProvider = async (req, res) => {

    const { providerEmail } = req.params;
    const provider = await findUserByEmail(providerEmail, Provider);

    try {
        if (provider) {
            const requests = await JobRequest.find({ provider: provider._id })
                .populate('consumer') // Populate the 'consumer' field with the corresponding object
                .populate('provider'); // Populate the 'provider' field with the corresponding object

            if (requests.length !== 0) {
                requests.sort((a, b) => b.date - a.date);
                res.status(200).json(requests);
            }
            else res.status(404).json({ error: 'Not Found Any Requests' });

        }
        else res.status(404).json({ message: 'Provider not found' });
    } catch (err) {

        console.error('Error fetching job requests:', err);
        res.status(500).json({ error: 'Unable to fetch job requests' });
    }
}

export const updateRequest = async (req, res) => {
    try {
        const updatedRequest = await JobRequest.findOneAndUpdate(
            { _id: req.body._id },
            {
                ...req.body
            },
            { new: true }
        ) //new: true - updated contact details will show
        if (updatedRequest) res.status(200).json(updatedRequest);
        else res.status(404).json({ error: 'Not Found Any Requests' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An unexpected error occurred.' })
    }
}