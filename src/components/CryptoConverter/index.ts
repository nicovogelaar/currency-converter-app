import { connect } from "react-redux"
import { AnyAction } from "redux"
import { State as StoreState } from "../../store"
import {
  currencies as fiatCurrencies,
  Currencies as FiatCurrencies,
} from "../CurrencyConverter/currencies"
import { CryptoConverter } from "./CryptoConverter"
import { currencies } from "./currencies"

const GET_SHORT_TICKER = "short_ticker/LOAD"
const GET_SHORT_TICKER_SUCCESS = "short_ticker/LOAD_SUCCESS"
const GET_SHORT_TICKER_FAIL = "short_ticker/LOAD_FAIL"

export interface Currency {
  code: string
  name: string
  image: any
}

export interface ExchangeRate {
  baseCurrency: string
  quoteCurrency: string
  symbol: string
  rate: number
}

export interface State {
  cryptoCurrencies: Currency[]
  fiatCurrencies: Currency[]
  rates: ExchangeRate[]
  loadingFiatExchangeRates?: boolean
  loadingShortTicker?: boolean
  loadingTicketPriceSymbols?: boolean
  error?: string
}

export const preloadedState: State = {
  cryptoCurrencies: [],
  fiatCurrencies: [],
  rates: [],
}

export function reducer(state: State = preloadedState, action: AnyAction): any {
  switch (action.type) {
    case GET_SHORT_TICKER:
      return { ...state, loadingShortTicker: true }
    case GET_SHORT_TICKER_SUCCESS:
      const cryptoCurrencies = parseCryptoCurrencies(action.payload.data)
      const rates = parseExchangeRates(action.payload.data)
      if (!cryptoCurrencies || !rates) {
        return {
          ...state,
          error: "Error while parsing short ticker",
          loadingShortTicker: false,
        }
      }
      return {
        ...state,
        cryptoCurrencies,
        loadingShortTicker: false,
        rates,
      }
    case GET_SHORT_TICKER_FAIL:
      return {
        ...state,
        error: "Error while fetching short ticker",
        loadingShortTicker: false,
      }
    default:
      return state
  }
}

const mapStateToProps = (state: StoreState): any => {
  const filteredFiatCurrencies = filterFiatCurrencies(fiatCurrencies, state.crypto.rates)
  return {
    cryptoCurrencies: state.crypto.cryptoCurrencies.map((currency: any) => ({ key: currency.code, ...currency })),
    fiatCurrencies: filteredFiatCurrencies.map((currency: any) => ({ key: currency.code, ...currency })),
    rates: state.crypto.rates.map((rate: any) => ({ key: rate.symbol, ...rate })),
  }
}

export const loadShortTicker = () => {
  return {
    payload: {
      client: "bitcoinAverage",
      request: {
        params: {
          crypto: Object.keys(currencies).join(","),
          fiat: Object.keys(fiatCurrencies).join(","),
        },
        url: "indices/global/ticker/short",
      },
    },
    type: GET_SHORT_TICKER,
  }
}

const mapDispatchToProps = {
  loadShortTicker,
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoConverter)

interface ShortTicker {
  last: number
  timestamp: number
}

function parseCryptoCurrencies(items: { [key: string]: ShortTicker }): Currency[] {
  const cryptoCurrencies: Currency[] = []
  const codes: string[] = []
  for (const key of Object.keys(items)) {
    const code: string = key.substr(0, 3)
    if (codes.indexOf(code) > -1) {
      continue
    }
    codes.push(code)
    cryptoCurrencies.push({
      code,
      image: currencies[code] ? currencies[code].image : undefined,
      name: currencies[code] ? currencies[code].name : code,
    })
  }
  return cryptoCurrencies
}

function parseExchangeRates(items: { [key: string]: ShortTicker }): ExchangeRate[] {
  const exchangeRates: ExchangeRate[] = []
  for (const key of Object.keys(items)) {
    exchangeRates.push({
      baseCurrency: key.substr(0, 3),
      quoteCurrency: key.substr(3),
      rate: items[key].last,
      symbol: key,
    })
  }
  return exchangeRates
}

function filterFiatCurrencies(allFiatCurrencies: FiatCurrencies, rates: ExchangeRate[]): Currency[] {
  const filteredFiatCurrencies: Currency[] = []
  const codes: string[] = []
  for (const code of Object.keys(allFiatCurrencies)) {
    if (codes.indexOf(code) > -1) {
      continue
    }
    codes.push(code)
    for (const rate of rates) {
      if (rate.quoteCurrency === code) {
        filteredFiatCurrencies.push({ code, ...allFiatCurrencies[code] })
        break
      }
    }
  }
  return filteredFiatCurrencies
}
