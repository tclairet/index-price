import * as exchange from './exchange';

describe('testing exchanges', () => {
    const limit = 10
    const pair = 'BTCUSD'
    test('binance', async () => {
        const orderBook = await exchange.binance.getOrderBook(pair, limit)
        expect(orderBook.asks.length).toBe(limit)
        expect(orderBook.bids.length).toBe(limit)
    });

    test('kraken', async () => {
        const orderBook = await exchange.kraken.getOrderBook(pair, limit)
        expect(orderBook.asks.length).toBe(limit)
        expect(orderBook.bids.length).toBe(limit)
    });

    test('huobi', async () => {
        const orderBook = await exchange.huobi.getOrderBook(pair, limit)
        expect(orderBook.asks.length).toBe(limit)
        expect(orderBook.bids.length).toBe(limit)
    })

    test('krakenWS', async () => {
        const orderBook = await exchange.krakenWS.getOrderBook(pair, limit)
        expect(orderBook.asks.length).toBe(limit)
        expect(orderBook.bids.length).toBe(limit)
    });
});

