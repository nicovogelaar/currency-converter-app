import React from "react"
import { Currency, ExchangeRate } from "."
import { Converter, ConvertFunc } from "../Converter"

export interface Props {
  baseCurrency: string
  cryptoCurrencies?: Currency[]
  fiatCurrencies?: Currency[]
  rates?: ExchangeRate[]
  quoteCurrency: string
}

export class CryptoConverter extends React.Component<Props> {

  public render() {
    const {
      baseCurrency,
      cryptoCurrencies,
      fiatCurrencies,
      quoteCurrency,
      rates,
    } = this.props

    return (
      <Converter
        baseCurrencies={cryptoCurrencies}
        baseCurrency={baseCurrency}
        quoteCurrencies={fiatCurrencies}
        quoteCurrency={quoteCurrency}
        convert={convertFunc(rates)} />
    )
  }
}

function convertFunc(rates: ExchangeRate[] | undefined): ConvertFunc {
  return (fromAmount: number, baseCurrency: Currency, quoteCurrency: Currency) => {
    return new Promise((resolve) => {
      if (!rates) {
        resolve("")
        return
      }
      const symbol = baseCurrency.code + quoteCurrency.code
      for (const rate of rates) {
        if (rate.symbol === symbol) {
          resolve(fromAmount * rate.rate)
          return
        }
      }
      resolve("")
    })
  }
}
