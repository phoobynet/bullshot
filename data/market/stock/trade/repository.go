package trade

import "github.com/alpacahq/alpaca-trade-api-go/v3/marketdata"

type Repository struct {
	marketDataClient *marketdata.Client
}

func NewRepository(marketDataClient *marketdata.Client) (*Repository, error) {
	return &Repository{
		marketDataClient: marketDataClient,
	}, nil
}

func (r *Repository) Latest(symbol string) (*marketdata.Trade, error) {
	return r.marketDataClient.GetLatestTrade(symbol, marketdata.GetLatestTradeRequest{
		Feed: marketdata.SIP,
	})
}
