import { OrderBook } from './types';

export function mid(orderBook: OrderBook): number {
    return (orderBook.bids[0][0] + orderBook.asks[0][0]) / 2;
}

export function average(prices: number[]): number {
    let sum = 0
    prices.forEach((price) => sum += price)
    return sum / prices.length
}
