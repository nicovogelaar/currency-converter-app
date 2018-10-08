import { Font } from "expo"
import React from "react"
import Icon from "react-native-vector-icons/FontAwesome"
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { createBottomTabNavigator, createStackNavigator, NavigationScreenOptions } from "react-navigation"
import { Provider } from "react-redux"
import { loadShortTicker } from "./src/components/CryptoConverter"
import { loadCurrencies } from "./src/components/CurrencyConverter"
import { CryptoScreen, HomeScreen } from "./src/screens"
import store from "./src/store"

export interface State {
  fontLoaded: boolean
}

export default class App extends React.Component<any, State> {
  constructor(props: any, state: State) {
    super(props, state)

    this.state = {
      fontLoaded: false,
    }
  }

  public async componentDidMount() {
    await Font.loadAsync({
      "FontAwesome": require("./node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf"),
      "FontAwesome5_Brands": require("./node_modules/react-native-vector-icons/Fonts/FontAwesome5_Brands.ttf"),
      "FontAwesome5_Regular": require("./node_modules/react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf"),
      "Lato Bold": require("./assets/fonts/Lato/Lato-Bold.ttf"),
      "Lato Italic": require("./assets/fonts/Lato/Lato-Italic.ttf"),
      "Lato Regular": require("./assets/fonts/Lato/Lato-Regular.ttf"),
    })

    this.setState({ fontLoaded: true })

    store.dispatch(loadCurrencies())
    store.dispatch(loadShortTicker())
  }

  public render() {
    return this.state.fontLoaded && (
      <Provider store={store}>
        <AppStack />
      </Provider>
    )
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Crypto: {
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => <IconFontAwesome5 name="bitcoin" size={25} color={tintColor} />,
        tabBarLabel: "Crypto",
      },
      screen: CryptoScreen,
    },
    Home: {
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => <Icon name="home" size={25} color={tintColor} />,
        tabBarLabel: "Home",
      },
      screen: HomeScreen,
    },
  },
  {
    order: ["Home", "Crypto"],
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
    },
  },
)

const AppStack = createStackNavigator(
  {
    Tab: TabNavigator,
  },
  {
    initialRouteName: "Tab",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#dc3545",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontFamily: "Lato Bold",
        fontWeight: "bold",
      },
      title: "Currency Converter",
    },
  } as NavigationScreenOptions,
)
