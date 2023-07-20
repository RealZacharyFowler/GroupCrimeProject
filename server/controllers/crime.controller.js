const Crime = require("../models/crime.model");
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

const createNewCrime = (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET_KEY); console.log("create new crime", user)
    //         Obj.create({ ...req.body, creator: user })
    Crime.create({ ...req.body, creator: user })
    .then((newCrime) => {
    res.json({ newCrime });
    })
    .catch((err) => {
    res.status(400).json({ err });
    });
};


const getAllCrime = (req, res) => {
Crime.find()
    .populate('creator', 'fullName')
    .then((allCrime) => {
    console.log(allCrime)
    res.json(allCrime);
    })
    .catch((err) => {
    res.status(400).json({ err });
    });
};

const getOneCrime = (req, res) => {
Crime.findOne({ _id: req.params.id })
    .then((queriedCrime) => {
    res.json(queriedCrime);
    })
    .catch((err) => {
    res.status(400).json({ err });
    });
};

const getByUser = (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET_KEY);
    console.log(user)
    Crime.find({ creator: user._id })
            .populate('creator', 'fullName ')
            .then(e => res.json(e))
            .catch(e => res.status(400).json({ message: 'problem finding obj by user', error: e }))
};

const updateCrime = (req, res) => {
Crime.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
})
    .then((updatedCrime) => {
    res.json({ updatedCrime });
    })
    .catch((err) => {
    res.status(400).json({ err });
    });
};


const deleteExistingCrime = (req, res) => {
Crime.deleteOne({ _id: req.params.id })
    .then((deletedResponse) => {
    res.json({ deletedResponse });
    })
    .catch((err) => {
    res.status(400).json({ err });
    });
};

module.exports = {
createNewCrime,
getOneCrime,
getAllCrime,
updateCrime,
deleteExistingCrime,
getByUser
};