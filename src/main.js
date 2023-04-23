class ShareSaleException extends Error {
    constructor(message) {
        super(message);
    }
}

class StockPortfolio {
    constructor() {
        this.portfolio = {};
    }

    getTickerCount() {
            return Object.keys(this.portfolio).length;
    }

    buy(symbol, shares) {
        // Update current symbol if exist, otherwise create new symbol
        if (this.portfolio[symbol])
            this.portfolio[symbol] += shares;
        else
            this.portfolio[symbol] = shares;
    }

    sell(symbol, shares) {
        // Does not exist or not enough shares
        if (!this.portfolio[symbol] || this.portfolio[symbol] < shares)
            throw new ShareSaleException("Selling invalid number of shares");
        this.portfolio[symbol] -= shares;

        // Remove stock if no more shares
        if (this.portfolio[symbol] === 0)
            delete this.portfolio[symbol];
    }

    getShares(symbol) {
        return !this.portfolio[symbol] ? 0 : this.portfolio[symbol];
    }
}

// Enable other files to use these
exports.ShareSaleException = ShareSaleException;
exports.StockPortfolio = StockPortfolio;