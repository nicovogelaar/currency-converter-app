import React from "react"
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native"
import CurrencyConverter from "../components/CurrencyConverter"

const baseCurrency = "EUR"
const quoteCurrency = "USD"

export default class HomeScreen extends React.Component {

  public render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.converter}>
            <CurrencyConverter baseCurrency={baseCurrency} quoteCurrency={quoteCurrency} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  container: {
    backgroundColor: "#f8f9fa",
    flex: 1,
    flexDirection: "column",
  } as ViewStyle,

  converter: {
    flex: 10,
    padding: 10,
  } as ViewStyle,

  menuIcon: {
    marginLeft: 10,
  } as ViewStyle,
}
