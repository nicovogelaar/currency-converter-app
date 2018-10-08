export interface Currencies {
  [key: string]: { name: string, image: any }
}

const assetsPath = "../../../assets"

export const currencies: Currencies = {
  AUD: {name: "Australian dollar", image: require(assetsPath + "/flags/au.png")},
  BGN: {name: "Bulgarian lev", image: require(assetsPath + "/flags/bg.png")},
  BRL: {name: "Brazilian real", image: require(assetsPath + "/flags/br.png")},
  CAD: {name: "Canadian dollar", image: require(assetsPath + "/flags/ca.png")},
  CHF: {name: "Swiss franc", image: require(assetsPath + "/flags/ch.png")},
  CNY: {name: "Chinese yuan renminbi", image: require(assetsPath + "/flags/cn.png")},
  CZK: {name: "Czech koruna", image: require(assetsPath + "/flags/cz.png")},
  DKK: {name: "Danish krone", image: require(assetsPath + "/flags/dk.png")},
  EEK: {name: "Estonian kroon", image: require(assetsPath + "/flags/ee.png")},
  EUR: {name: "Euro", image: require(assetsPath + "/flags/eu.png")},
  GBP: {name: "British pound", image: require(assetsPath + "/flags/gb.png")},
  HKD: {name: "Hong Kong dollar", image: require(assetsPath + "/flags/hk.png")},
  HRK: {name: "Croatian kuna", image: require(assetsPath + "/flags/hr.png")},
  HUF: {name: "Hungarian forint", image: require(assetsPath + "/flags/hu.png")},
  IDR: {name: "Indonesian rupiah", image: require(assetsPath + "/flags/id.png")},
  ILS: {name: "Israeli New Shekel", image: require(assetsPath + "/flags/il.png")},
  INR: {name: "Indian rupee", image: require(assetsPath + "/flags/in.png")},
  ISK: {name: "Icelandic króna", image: require(assetsPath + "/flags/is.png")},
  JPY: {name: "Japanese yen", image: require(assetsPath + "/flags/jp.png")},
  KRW: {name: "South Korean won", image: require(assetsPath + "/flags/kr.png")},
  LTL: {name: "Lithuanian litas", image: require(assetsPath + "/flags/lt.png")},
  LVL: {name: "Latvian lats", image: require(assetsPath + "/flags/lv.png")},
  MXN: {name: "Mexican peso", image: require(assetsPath + "/flags/mx.png")},
  MYR: {name: "Malaysian ringgit", image: require(assetsPath + "/flags/my.png")},
  NOK: {name: "Norwegian krone", image: require(assetsPath + "/flags/no.png")},
  NZD: {name: "New Zealand dollar", image: require(assetsPath + "/flags/nz.png")},
  PHP: {name: "Philippine peso", image: require(assetsPath + "/flags/ph.png")},
  PLN: {name: "Polish zloty", image: require(assetsPath + "/flags/pl.png")},
  RON: {name: "Romanian leu", image: require(assetsPath + "/flags/ro.png")},
  RUB: {name: "Russian ruble", image: require(assetsPath + "/flags/ru.png")},
  SEK: {name: "Swedish krona", image: require(assetsPath + "/flags/se.png")},
  SGD: {name: "Singapore dollar", image: require(assetsPath + "/flags/sg.png")},
  THB: {name: "Thai baht", image: require(assetsPath + "/flags/th.png")},
  TRY: {name: "Turkish lira", image: require(assetsPath + "/flags/tr.png")},
  USD: {name: "United States dollar", image: require(assetsPath + "/flags/us.png")},
  ZAR: {name: "South African rand", image: require(assetsPath + "/flags/za.png")},
}
