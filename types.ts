// todo
//  maybe verify sorting of asks and bids ?
//  use or remove quantity (index [1])
export type OrderBook = {
    asks: number[][] // array of ask where ask[0] is the price and ask[1] the quantity, ordered from small to big
    bids: number[][] // array of bids where bid[0] is the price and bid[1] the quantity, ordered from big to small
}