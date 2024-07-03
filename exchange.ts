import axios from 'axios';

interface Exchange {
    name: string
    getOrderBook(limit: number): Promise<OrderBook>;
}

type OrderBook = {
    bids: number[][]
    asks: number[][]
}

export let binance: Exchange = {
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
                bids: response.data.bids.map((bid: [string, string]) => [parseFloat(bid[0]), parseFloat(bid[1])]),
                asks: response.data.asks.map((ask: [string, string]) => [parseFloat(ask[0]), parseFloat(ask[1])]),
            };
        }
        catch(error: any) {
            throw error;
        }
    }
}

export let kraken: Exchange = {
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
                bids: response.data.result[pair].bids.map((bid: [string, string]) => [parseFloat(bid[0]), parseFloat(bid[1])]),
                asks: response.data.result[pair].asks.map((ask: [string, string]) => [parseFloat(ask[0]), parseFloat(ask[1])]),
            };
        }
        catch(error: any) {
            throw error;
        }
    }
}

export let huobi: Exchange = {
    name: "huobi",

    async getOrderBook(limit: number): Promise<OrderBook> {
        const options = {
            method: 'GET',
            url: 'https://api.huobi.pro/market/depth?symbol=btcusdt&type=step0&depth='+limit,
        }

        try {
            const response = await axios.request(options)
            return {
                bids: response.data.tick.bids,
                asks: response.data.tick.asks,
            }
        }
        catch(error: any) {
            throw error;
        }
    }
}