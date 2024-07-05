# index-price

This service expose the route `/price-index` that will retrieve the order book of several exchanges and then compute the global price index.
This version currently only support BTCUSD pair.

# run
```
npm start
```

```
curl http://localhost:4000/price-index 
```

# test
```
npm test
```

# improvement
- support other pairs
- rather than fetching for each request we could fetch in background and store in cache the latest price index which would be returned for each request
- add more exchanges