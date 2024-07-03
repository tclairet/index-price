import { exchanges } from './exchange';
import * as price from './price'  ;

async function fetchMidPrices() {
    const limit = 10

    let midPrices: number[] = []
    console.log('mid prices');
    await Promise.all(exchanges.map(async (exchange) => {
        console.time(exchange.name)
        const orderBook = await exchange.getOrderBook(limit)
        const midPrice = price.mid(orderBook)
        midPrices.push(midPrice)
        console.log('\t', exchange.name, midPrice);
    }));

    const averagePrice = price.average(midPrices)
    console.log('average', averagePrice);
}

fetchMidPrices()