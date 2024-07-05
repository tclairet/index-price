import express from 'express';
import {exchanges, supportedPairs} from "./exchange";
import * as price from "./price";

const app = express();
const port = 4000;
const limit = 10

app.get('/price-index', async (req, res) => {
    let pair = "BTCUSD"
    if (typeof req.query.pair === "string") {
        if (!supportedPairs.has(req.query.pair)) {
            res.status(400).json({
                "error": "unsupported pair " + req.query.pair,
            })
            return
        }
        pair = req.query.pair
    }

    const midPrices: number[] = []
    await Promise.all(exchanges.map(async (exchange) => {
        const orderBook = await exchange.getOrderBook(pair, limit)
        const midPrice = price.mid(orderBook)
        midPrices.push(midPrice)
    }));

    res.json({
        "pair": pair,
        "price": price.average(midPrices).toFixed(2),
    })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});