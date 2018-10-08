import { connect } from "react-redux"
import { AnyAction } from "redux"
import { State as StoreState } from "../../store"
import { currencies } from "./currencies"
import { CurrencyConverter } from "./CurrencyConverter"

const GET_CURRENCIES = "currencies/LOAD"
const GET_CURRENCIES_SUCCESS = "currencies/LOAD_SUCCESS"
const GET_CURRENCIES_FAIL = "currencies/LOAD_FAIL"

export interface Currency {
  code: string
  name: string
  rate: number
  source: boolean
  image: any
}

interface State {
  currencies: Currency[]
  loading?: boolean
  error?: string
}

const sourceCurrency = "EUR"

const defaultState: State = { currencies: [] }

export function reducer(state: State = defaultState, action: AnyAction): any {
  switch (action.type) {
    case GET_CURRENCIES:
      return { ...state, loading: true }
    case GET_CURRENCIES_SUCCESS:
      const data = parseXML(action.payload.request._response)
      if (!data) {
        return {
          ...state,
          error: "Error while parsing currencies",
          loading: false,
        }
      }
      return { ...state, loading: false, currencies: data.rates }
    case GET_CURRENCIES_FAIL:
      return {
        ...state,
        error: "Error while fetching currencies",
        loading: false,
      }
    default:
      return state
  }
}

interface ExchangeRates {
  date: Date
  rates: Currency[]
}

const mapStateToProps = (state: StoreState): State => {
  return {
    currencies: state.currency.currencies.map((currency: any) => ({ key: currency.code, ...currency })),
  }
}

export const loadCurrencies = () => {
  return {
    payload: {
      client: "ecb",
      request: {
        url: "eurofxref-daily.xml",
      },
    },
    type: GET_CURRENCIES,
  }
}

const mapDispatchToProps = {
  loadCurrencies,
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter)

function parseXML(xml: string): ExchangeRates | undefined {
  let match = /time='([^']{10})'/.exec(xml)
  if (!match) {
    return
  }
  const result = {
    date: new Date(match[1]),
    rates: [{
      code: sourceCurrency,
      image: currencies[sourceCurrency].image,
      name: currencies[sourceCurrency].name,
      rate: 1,
      source: true,
    }],
  }
  const regexp = /currency='([A-Z]{3})'\s*rate='([0-9.]+)'/g
  while (true) {
    match = regexp.exec(xml)
    if (!match) {
      break
    }
    result.rates.push({
      code: match[1],
      image: currencies[match[1]] ? currencies[match[1]].image : undefined,
      name: currencies[match[1]] ? currencies[match[1]].name : match[1],
      rate: parseFloat(match[2]),
      source: false,
    })
  }
  result.rates.sort((a, b) => {
    if (a.name < b.name) { return -1 }
    if (a.name > b.name) { return 1 }
    return 0
  })
  return result
}
