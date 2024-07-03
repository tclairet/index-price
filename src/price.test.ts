import { mid } from './price';
import { OrderBook } from './types';

describe('mid price', () => {
    test('should be equal to 100', async () => {
        const orderBook: OrderBook = {
            asks: [[100, 1], [1000, 1]],
            bids: [[100, 1], [1, 1]]
        }
        const midPrice = mid(orderBook)
        expect(midPrice).toBeGreaterThan(10)
    });
});
