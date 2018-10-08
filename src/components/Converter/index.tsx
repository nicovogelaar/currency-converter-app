import React from "react"
import {
  Button,
  Image,
  ImageStyle,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"

export interface Currency {
  code: string
  name: string
  image: any
}

export interface Props {
  fromAmount?: number
  baseCurrencies?: Currency[]
  baseCurrency: string
  quoteCurrency: string
  quoteCurrencies?: Currency[]
  convert: ConvertFunc
}

export interface State {
  fromAmount: number | string
  baseCurrency: string
  quoteCurrency: string
  toAmount: number | string
}

export type ConvertFunc = (fromAmount: number, baseCurrency: Currency, quoteCurrency: Currency) =>
  Promise<number | string>

export class Converter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const fromAmount: number = props.fromAmount || 1

    this.state = {
      baseCurrency: props.baseCurrency,
      fromAmount,
      quoteCurrency: props.quoteCurrency,
      toAmount: "",
    }
  }

  public convert() {
    const { convert, baseCurrencies, quoteCurrencies } = this.props

    if (baseCurrencies && quoteCurrencies) {
      const fromAmount = parseFloat("" + this.state.fromAmount)
      const baseCurrency = filterCurrencyByCode(baseCurrencies, this.state.baseCurrency)
      const quoteCurrency = filterCurrencyByCode(quoteCurrencies, this.state.quoteCurrency)

      if (baseCurrency && quoteCurrency) {
        convert(fromAmount, baseCurrency, quoteCurrency)
          .then((toAmount: number | string) => this.setState({ toAmount }) )
          .catch((error) => {
            // console.log("Something went wrong: ", error)
            this.setState({ toAmount: "" })
          })
      }
    }
  }

  public onPressConvert() {
    this.convert()
  }

  public onChangeBaseCurrency(code: string) {
    this.setState({ baseCurrency: code, toAmount: "" })
  }

  public onChangeQuoteCurrency(code: string) {
    this.setState({ quoteCurrency: code, toAmount: "" })
  }

  public render() {
    const { baseCurrencies, quoteCurrencies } = this.props

    let baseCurrency: Currency | undefined
    let quoteCurrency: Currency | undefined

    if (baseCurrencies && quoteCurrencies) {
      baseCurrency = filterCurrencyByCode(baseCurrencies, this.state.baseCurrency)
      quoteCurrency = filterCurrencyByCode(quoteCurrencies, this.state.quoteCurrency)
    }

    return (
      <View style={styles.container}>
        <View style={styles.currencyRow}>
          <View style={styles.currencyLabel}>
            <Text style={styles.currencyLabelText}>From currency</Text>
          </View>
          <View style={styles.amountRow}>
            <View style={styles.amountLabel}>
              <Text>{this.state.baseCurrency}</Text>
            </View>
            <View style={styles.amountInputView}>
              <TextInput
                style={styles.amountInput}
                keyboardType="numeric"
                onChangeText={(fromAmount) => this.setState({ fromAmount })}
                value={"" + this.state.fromAmount}
              />
            </View>
          </View>
          <View style={styles.pickerRow}>
            <View style={styles.pickerLabel}>
              {baseCurrency && baseCurrency.image && <Image source={baseCurrency.image} style={styles.image} />}
            </View>
            <View style={styles.pickerView}>
              <Picker
                selectedValue={this.state.baseCurrency}
                style={styles.picker}
                onValueChange={(code: string) => this.onChangeBaseCurrency(code)}>
                {baseCurrencies && baseCurrencies.map((item: any, index) => {
                  const label = item.name ? item.name + " (" + item.code + ")" : item.code
                  return (<Picker.Item label={label} value={item.code} key={index}/>)
                })}
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.currencyRow}>
          <View style={styles.currencyLabel}>
            <Text style={styles.currencyLabelText}>To currency</Text>
          </View>
          <View style={styles.pickerRow}>
            <View style={styles.pickerLabel}>
              {quoteCurrency && quoteCurrency.image && <Image source={quoteCurrency.image} style={styles.image} />}
            </View>
            <View style={styles.pickerView}>
              <Picker
                selectedValue={this.state.quoteCurrency}
                style={styles.picker}
                onValueChange={(code: string) => this.onChangeQuoteCurrency(code)}>
                {quoteCurrencies && quoteCurrencies.map((item: any, index) => {
                  const label = item.name ? item.name + " (" + item.code + ")" : item.code
                  return (<Picker.Item label={label} value={item.code} key={index}/>)
                })}
              </Picker>
            </View>
          </View>
          <View style={styles.amountRow}>
            <View style={styles.amountLabel}>
              <Text>{this.state.quoteCurrency}</Text>
            </View>
            <View style={styles.amountInputView}>
              <TextInput style={styles.amountInput} value={"" + this.state.toAmount} editable={false} />
            </View>
          </View>
        </View>

        <View style={styles.buttonView}>
          <Button
              onPress={() => this.onPressConvert()}
              title="Convert currency"
              color="#28a745"
              accessibilityLabel="Convert currency"
            />
        </View>
      </View>
    )
  }
}

function filterCurrencyByCode(currencies: Currency[], code: string): Currency | undefined {
  for (const index in currencies) {
    if (code === currencies[index].code) {
      return currencies[index]
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  currencyRow: {
    flex: 1,
  } as ViewStyle,

  currencyLabel: {
    alignItems: "center",
    flex: 0.5,
    flexDirection: "row",
    padding: 10,
  } as ViewStyle,

  currencyLabelText: {
    fontFamily: "Lato Regular",
    fontSize: 18,
  } as TextStyle,

  amountRow: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 4,
    borderWidth: 0.5,
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
    padding: 10,
  } as ViewStyle,

  pickerRow: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 4,
    borderWidth: 0.5,
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
    padding: 10,
  } as ViewStyle,

  amountLabel: {
    flex: 1,
    padding: 10,
  } as ViewStyle,

  amountInputView: {
    flex: 5,
  } as ViewStyle,

  amountInput: {
    fontSize: 18,
    height: 60,
  } as ViewStyle,

  currencyPickerView: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    padding: 5,
  } as ViewStyle,

  image: {
    maxHeight: 24,
    maxWidth: 24,
  } as ImageStyle,

  pickerLabel: {
    alignItems: "center",
    flex: 1,
  } as ViewStyle,

  pickerView: {
    alignItems: "center",
    flex: 5,
    flexDirection: "row",
    padding: 5,
  } as ViewStyle,

  picker: {
    width: "100%",
  } as ViewStyle,

  buttonView: {
    padding: 10,
  } as ViewStyle,
})
