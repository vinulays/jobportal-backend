import { Consumer } from "../models/consumerModel.js";
import { checkNullOrUndefined, isNumberContain, emailCorrect, findUserByEmail } from '../middleware/validation.js'

export const addNewConsumer = (req, res) => {

    const password = req.body.password;
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const city = req.body.city;
    const state = req.body.state;
    const street = req.body.street;
    const country = req.body.country;
    const zip = req.body.zip;

    const evaluateStrings = [password, firstName, lastName, email, city, country, zip].map(checkNullOrUndefined);
    const notNullOrUndefined = evaluateStrings.every((value) => value === true)

    const evaluateNumberContain = [firstName, lastName].map(isNumberContain);
    const isNumberContainV = evaluateNumberContain.every((value) => value === true);

    const isEmailCorrect = emailCorrect(email);

    if (notNullOrUndefined && isEmailCorrect && isNumberContainV) {
        let newConsumer = new Consumer();
        newConsumer.password = password
        newConsumer.firstName = firstName
        newConsumer.lastName = lastName
        newConsumer.email = email;
        newConsumer.city = city;
        newConsumer.state = state;
        newConsumer.street = street;
        newConsumer.country = country;
        newConsumer.zip = zip;

        newConsumer.save()
            .then(() => res.status(200).send('Successfully added the consumer'))
            .catch((err) => {
                if (err.message.includes('E11000 duplicate key error')) {
                    res.status(409).json({ error: 'The provided email is already associated with another provider.' });
                }
                else res.status(500).json({ error: 'An unexpected error occurred.' });
            })
    }

    else {
        res.status(422).json({
            password: evaluateStrings[0] ? password : "Error",
            firstname: evaluateStrings[1] || evaluateNumberContain[0]
                ? firstName : "Error",
            lastname: evaluateStrings[2] || evaluateNumberContain[1]
                ? lastName : "Error",
            email: evaluateStrings[3] || isEmailCorrect
                ? email : "Error",
            city: evaluateStrings[4] ? city : "Error",
            state: state,
            street: street,
            country: evaluateStrings[5] ? country : "Error",
            zip: evaluateStrings[6] ? zip : "Error"
        });
    }


}


export const authentication = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


    try {
        const consumerByEmail = await findUserByEmail(email, Consumer)

        if (consumerByEmail) {
            if (consumerByEmail.password === password) {
                res.status(200).json(consumerByEmail);
            } else {
                res.status(401).json({ error: 'Incorrect password.' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}

