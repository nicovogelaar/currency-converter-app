import axios from "axios"
import { applyMiddleware, combineReducers, createStore } from "redux"
import { multiClientMiddleware } from "redux-axios-middleware"
import { reducer as cryptoConverterReducer } from "./components/CryptoConverter"
import { reducer as currencyConverterReducer } from "./components/CurrencyConverter"

const ecbClient = axios.create({
  baseURL: "https://www.ecb.europa.eu/stats/eurofxref/",
  responseType: "document",
})

const bitcoinAverageClient = axios.create({
  baseURL: "https://apiv2.bitcoinaverage.com/",
  responseType: "json",
})

const combinedReducers = combineReducers({
  crypto: cryptoConverterReducer,
  currency: currencyConverterReducer,
})

export interface State {
  currency: {
    currencies: any[],
  },
  crypto: {
    cryptoCurrencies: any[],
    fiatCurrencies: any[],
    rates: any[],
  },
}

export default createStore(
  combinedReducers,
  {
    crypto: {
      cryptoCurrencies: [],
      fiatCurrencies: [],
      rates: [],
    },
    currency: { currencies: [] },
  } as State | any,
  applyMiddleware(
    multiClientMiddleware({
      bitcoinAverage: {
        client: bitcoinAverageClient,
      },
      ecb: {
        client: ecbClient,
      },
    }),
  ),
)
