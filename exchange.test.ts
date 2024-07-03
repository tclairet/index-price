import { binance, kraken, huobi, krakenWS} from './exchange';

describe('testing exchanges', () => {
    const limit = 10
    test('binance', async () => {
        const orderBook = await binance.getOrderBook(limit)
        expect(orderBook.asks.length).toBe(limit)
        expect(orderBook.bids.length).toBe(limit)
    });

    test('kraken', async () => {
        const orderBook = await kraken.getOrderBook(limit)
        expect(orderBook.asks.length).toBe(limit)
        expect(orderBook.bids.length).toBe(limit)
    });

    test('huobi', async () => {
        const orderBook = await huobi.getOrderBook(limit)
        expect(orderBook.asks.length).toBe(limit)
        expect(orderBook.bids.length).toBe(limit)
    })

    test('krakenWS', async () => {
        const orderBook = await krakenWS.getOrderBook(limit)
        expect(orderBook.asks.length).toBe(limit)
        expect(orderBook.bids.length).toBe(limit)
    });
});

