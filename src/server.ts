import express from 'express';
import {exchanges} from "./exchange";
import * as price from "./price";

const app = express();
const port = 4000;
const limit = 10

app.get('/price-index', async (req, res) => {
    const midPrices: number[] = []
    await Promise.all(exchanges.map(async (exchange) => {
        const orderBook = await exchange.getOrderBook(limit)
        const midPrice = price.mid(orderBook)
        midPrices.push(midPrice)
    }));

    res.json({
        "pair": "BTC/USD",
        "price": price.average(midPrices).toFixed(2),
    })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});