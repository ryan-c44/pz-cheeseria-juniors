import * as express from 'express';

const fs = require('fs');
const cheeses = require('./data/cheeses.json');

//Storing purchases in a json file, same as cheeses
const purchases = require('./data/purchases.json');

const router = express.Router();

router.get('/api/cheeses', (req, res, next) => {
    res.json(cheeses);
});

router.post('/api/buy', (req, res, next) => {
    const purchasedItems = req.body;
    const purchaseId = purchases.length + 1;
    
    //Construct new object obtaining an order_id, the items within the order and the total price
    const purchaseData = {
        id: purchaseId,
        items: purchasedItems.items,
        total: purchasedItems.total
    };

    //Add the purchaseData to the front of the array
    purchases.unshift(purchaseData);
    
    //Write the purchase information to file, acting as data store for this challenge.
    try {
        fs.writeFileSync('./src/server/data/purchases.json', JSON.stringify(purchases, null, 2));
        res.status(200).json("Success");
    } catch (error) {
        console.log("Error with purchase", error);
        res.status(400).json("Error");
    }
});

// Get and return the purchases from file
router.get('/api/purchases', (req, res, next) => {
    res.json(purchases);
});

export default router;