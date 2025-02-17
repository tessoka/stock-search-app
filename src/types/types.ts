export type ApiInformaton = {
  Information?: string;
};

export type StockSearchResultItem = {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
};

export type StockSearchResult = {
  bestMatches: StockSearchResultItem[];
} & ApiInformaton;

export type StockGlobalQuote = {
  "Global Quote": {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  };
} & ApiInformaton;

export type StockTimeSeries = {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Time Series (Daily)"?: {
    [key: string]: TimeSeriesData;
  };
  "Time Series (5min)"?: {
    [key: string]: TimeSeriesData;
  };
} & ApiInformaton;

type TimeSeriesData = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
};

export type FormattedStockTimeSerie = {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export type ChartPeriod = "1D" | "5D" | "30D" | "100D";
