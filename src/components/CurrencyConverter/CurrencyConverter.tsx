import React from "react"
import { Currency } from "."
import { Converter, ConvertFunc } from "../Converter"

export interface Props {
  baseCurrency: string
  currencies?: Currency[]
  quoteCurrency: string
}

export class CurrencyConverter extends React.Component<Props> {

  public render() {
    const {
      baseCurrency,
      currencies,
      quoteCurrency,
    } = this.props

    return (
      <Converter
        baseCurrencies={currencies}
        baseCurrency={baseCurrency}
        quoteCurrencies={currencies}
        quoteCurrency={quoteCurrency}
        convert={convertFunc()} />
    )
  }
}

function convertFunc(): ConvertFunc {
  return (fromAmount: number, baseCurrency: any, quoteCurrency: any) => {
    return new Promise((resolve) => {
      if (!baseCurrency.rate || !quoteCurrency.rate) {
        resolve("")
      } else {
        let toAmount = fromAmount
        if (!baseCurrency.source) {
          toAmount = toAmount / baseCurrency.rate
        }
        if (!quoteCurrency.source) {
          toAmount = toAmount * quoteCurrency.rate
        }
        resolve(toAmount)
      }
    })
  }
}
