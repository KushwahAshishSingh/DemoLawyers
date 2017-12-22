/*
Main routes
*/
const ObjectId = require('mongodb').ObjectID;
const firstname = require('mongodb').firstName;
const subscriptionYear = require('mongodb').subscriptionYear;
const district = require('mongodb').district;
module.exports = function(app, db) {
    app.post('/lawyers', (req, res) => {
        const errors = validateLawyer(req);

    console.log(req.body);
    console.log(errors);
    if (errors.length) {
        return res.send({errors: errors});
    }

    const lawyer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: {
            streetAddress: req.body.address.streetAddress,
            district: req.body.address.district,
            pincode: req.body.address.pincode
        },
        phone: req.body.phone,
        email: req.body.email,
        agentId: req.body.agentId,
        subscriptionYear: req.body.subscriptionYear,
        discount: req.body.discount,
        notes: req.body.notes
    };

    db.collection('lawyers').insert(lawyer, (err, result) => {
        if(err) {
            res.send({error: 'An error has occurred'});
        } else {
            res.send(result.ops[0]);
		}
	});
});


};

function validateLawyer(req) {

	const errors = [];
	if (!req.body.firstName) {
		errors.push({
			field: 'firstName',
			message: 'First name is required'
		});
	}

	if (!req.body.lastName) {
		errors.push({
			field: 'lastName',
			message: 'Last Name is required'
		});
	}

	if (!req.body.address) {
		errors.push({
			field: 'address',
			message: 'Address is required'
		});
	} else {
		if (!req.body.address.streetAddress) {
			errors.push({
				field: 'streetAddress',
				message: 'Street Address is required'
			});
		}
		if (!req.body.address.district) {
			errors.push({
				field: 'district',
				message: 'District is required'
			});
		}
		if (!req.body.address.pincode) {
			errors.push({
				field: 'pincode',
				message: 'Pincode is required'
			});
		}
	}

	if (!req.body.agentId) {
		errors.push({
			field: 'agentId',
			message: 'Agent Id is required'
		});
	}

	if (!req.body.subscriptionYear) {
		errors.push({
			field: 'subscriptionYear',
			message: 'Subscription Year is required'
		});
	}
	return errors;
}
