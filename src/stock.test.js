const { StockPortfolio, ShareSaleException } = require("./main");

describe("StockPortfolio", () => {
    // Init - created with an empty number of shares
    let stockPortfolio;
    beforeEach(() => {
        stockPortfolio = new StockPortfolio();
    });

    // 2.2 The stock portfolio shall answer whether it is empty (no shares owned).
    test("Nothing in Stock Portfolio", () => {
        expect(stockPortfolio.getTickerCount()).toBe(0);
    });

    // 2.3 count of unique ticker symbols
    test("Count Unique Ticker Symbols", () => {
        stockPortfolio.buy("GME", 5);
        stockPortfolio.buy("RBLX", 10);
        expect(stockPortfolio.getTickerCount()).toBe(2);
    });

    // 2.4 Make a purchase. Given a symbol and # of shares,
    // the portfolio should be updated accordingly (add shares to a symbol).
    test("Unique symbols in portfolio", () => {
        stockPortfolio.buy("GME", 5);
        stockPortfolio.buy("RBLX", 10);
        stockPortfolio.buy("GME", 15);
        stockPortfolio.buy("RBLX", 20);
        expect(stockPortfolio.getTickerCount()).toBe(2);
    });

    // 2.5 Make a sale. Given a symbol and # of shares,
    // the portfolio should be updated accordingly (subtract shares from a symbol).
    // 2.6 The stock portfolio shall answer how many shares exist for a given symbol.
    // Seems like it was possible to combine these 2 parts? Maybe not the best idea?
    test("Making a sale", () => {
        stockPortfolio.buy("GME", 5);
        stockPortfolio.sell("GME", 1);
        expect(stockPortfolio.getShares("GME")).toBe(4);
    });

    // 2.7 The portfolio should keep only owned symbols.
    // If symbols are in the portfolio, that means at least one stock should be owned.
    test("Number of unique tickers", () => {
        stockPortfolio.buy("GME", 5);
        stockPortfolio.buy("RBLX", 10);
        stockPortfolio.sell("GME", 5);
        expect(stockPortfolio.getTickerCount()).toBe(1);
    });

    // 2.8 It should not be possible to sell too many shares.
    // Raise an exception (named ShareSaleException) when attempting
    // to sell more shares than actually owned by the portfolio.
    test("Selling too many shares", () => {
        stockPortfolio.buy("GME", 5);
        expect(() => stockPortfolio.sell("GME", 6)).toThrowError(ShareSaleException);
    });
});
