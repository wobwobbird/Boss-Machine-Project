const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    const rev = numWeeks * weeklyRevenue;
    if (!numWeeks || !weeklyRevenue) {
        res.status(400).send();
    }
    if (typeof numWeeks === !String || typeof weeklyRevenue === !String) {
        return res.status(400).send();
    }
    if (rev >= 1000000) {
        next();
    } else {
        return res.status(400).send();
    }
};




// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
