import axios from 'axios';
import WebSocket from 'ws';
import { OrderBook } from './types';

export interface Exchange {
    name: string;
    getOrderBook(limit: number): Promise<OrderBook>;
}

export const binance: Exchange = {
    name: "binance",

    async getOrderBook(limit: number): Promise<OrderBook> {
        const options = {
            method: 'GET',
            url: 'https://api.binance.com/api/v3/depth',
            params: {symbol: 'BTCUSDT', limit: limit},
        }

        try {
            const response = await axios.request(options)
            return {
                asks: response.data.asks.map((ask: [string, string]) => [parseFloat(ask[0]), parseFloat(ask[1])]),
                bids: response.data.bids.map((bid: [string, string]) => [parseFloat(bid[0]), parseFloat(bid[1])]),
            };
        }
        catch(error) {
            throw('exchange ' + this.name + ' unexpected error: ' + error)
        }
    }
}

export const kraken: Exchange = {
    name: "kraken",

    async getOrderBook(limit: number): Promise<OrderBook> {
        const pair = 'XBTUSDT'
        const options = {
            method: 'GET',
            url: 'https://api.kraken.com/0/public/Depth',
            params: {pair: pair, count: limit},
        }

        try {
            const response = await axios.request(options)
            return {
                asks: response.data.result[pair].asks.map((ask: [string, string]) => [parseFloat(ask[0]), parseFloat(ask[1])]),
                bids: response.data.result[pair].bids.map((bid: [string, string]) => [parseFloat(bid[0]), parseFloat(bid[1])]),
            };
        }
        catch(error) {
            throw('exchange ' + this.name + ' unexpected error: ' + error)
        }
    }
}

export const huobi: Exchange = {
    name: "huobi",

    async getOrderBook(limit: number): Promise<OrderBook> {
        const options = {
            method: 'GET',
            url: 'https://api.huobi.pro/market/depth?symbol=btcusdt&type=step0&depth='+limit,
        }

        try {
            const response = await axios.request(options)
            return {
                asks: response.data.tick.asks,
                bids: response.data.tick.bids,
            }
        }
        catch(error) {
            throw('exchange ' + this.name + ' unexpected error: ' + error)
        }
    }
}

export const krakenWS: Exchange = {
    name: "krakenWS",

    async getOrderBook(limit: number): Promise<OrderBook> {
        return new Promise<OrderBook>((resolve, reject) => {
            const ws = new WebSocket('wss://ws.kraken.com')

            ws.on('open', () => {
                const sub = {
                    event: 'subscribe',
                    pair: ['XBT/USD'],
                    subscription: {
                        name: 'book',
                        depth: limit,
                    }
                }
                ws.send(JSON.stringify(sub))
            })

            ws.on('message', (data) => {
                const message = JSON.parse(data.toString())

                if (message.status == 'error') {
                    reject(message.errorMessage)
                }
                if (Array.isArray(message) && message[1]?.as && message[1]?.bs) {
                    const orderBook: OrderBook = {
                        asks: message[1].as.map((ask: string[]) => [parseFloat(ask[0]), parseFloat(ask[1])]),
                        bids: message[1].bs.map((bid: string[]) => [parseFloat(bid[0]), parseFloat(bid[1])])
                    }
                    resolve(orderBook)
                    ws.close()
                }
            })
            ws.on('error', reject)
        })
    }
}

export const exchanges: Exchange[] = [binance, huobi, krakenWS]