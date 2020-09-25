import React from "react";
import { connect } from "react-redux";
import { fetchCurrentFXRate, convertToPocket } from "../homeAction";
import { CURRENCYS } from "../../mockData";
import SelectEl from "../Common/Select";
import InputEl from "../Common/Input";
import "./Exchange.css";
import { getCurrencySymbol } from "../Pockets/Pockets";

const defaultOptionList = [CURRENCYS.USD, CURRENCYS.EUR, CURRENCYS.GBP];
const validInputReg = new RegExp(/^[+-]?((\d+(\.\d{1,2})?)|(\.\d+))$/);

export const getToCurrencyList = (targetCur: CURRENCYS) =>
  defaultOptionList.filter((val: CURRENCYS) => val !== targetCur);

export type ExchangeState = {
  fromCurrency: CURRENCYS;
  fromAmount: number | undefined;
  toCurrencyList: Array<CURRENCYS>;
  toCurrency: CURRENCYS;
  toAmount: number | undefined;
};

export type Props = {
  fetchCurrentFXRate: Function;
  convertToPocket: Function;
  fxRate: any;
};

export class Exchange extends React.Component<Props, ExchangeState> {
  state = {
    fromCurrency: CURRENCYS.USD,
    toCurrencyList: getToCurrencyList(CURRENCYS.USD),
    toCurrency: getToCurrencyList(CURRENCYS.USD)[0],
    toAmount: undefined,
    fromAmount: undefined,
  };

  componentDidMount() {
    this.props.fetchCurrentFXRate(this.state.fromCurrency);
  }

  selectFromChangeHandler = async (value: CURRENCYS) => {
    await this.props.fetchCurrentFXRate(value);
    this.setState({
      fromCurrency: value,
      toCurrencyList: getToCurrencyList(value),
      toCurrency: getToCurrencyList(value)[0],
      toAmount:
        this.state.fromAmount! *
        this.getExchangeVal(getToCurrencyList(value)[0]),
    });
  };

  selectToChangeHandler = (value: any) => {
    this.setState({
      toCurrency: value,
      toAmount: this.state.fromAmount! * this.getExchangeVal(value),
    });
  };

  selectFromHandler = (value: any) => {
    this.setState({
      fromAmount: value,
      toAmount: value * this.getExchangeVal(),
    });
  };

  getExchangeVal = (targetCurrency: CURRENCYS | undefined = undefined) => {
    if (this.props.fxRate && this.props.fxRate.rates) {
      return targetCurrency
        ? this.props.fxRate.rates[targetCurrency!]
        : this.props.fxRate.rates[this.state.toCurrency];
    }
  };

  handleConvertPocket = () => {
    const { fromAmount, fromCurrency, toAmount, toCurrency } = this.state;
    this.props.convertToPocket({
      fromAmount,
      fromCurrency,
      toAmount,
      toCurrency,
    });
  };

  render() {
    const exchangeRateString =
      this.getExchangeVal() &&
      `1${getCurrencySymbol(
        this.state.fromCurrency
      )} = ${this.getExchangeVal()}${getCurrencySymbol(this.state.toCurrency)}`;

    return (
      <section className="exchange-container">
        <div className="exchange-rate">{exchangeRateString}</div>
        <div className="exchange-from-container">
          <div className="exchange-box">
            <SelectEl
              onChange={this.selectFromChangeHandler}
              optionLists={defaultOptionList}
              currentVal={this.state.fromCurrency}
            />
            <InputEl
              onChange={this.selectFromHandler}
              value={this.state.fromAmount}
            />
          </div>
          <div className="exchange-to-label"> to </div>
          <div className="exchange-box">
            <SelectEl
              onChange={this.selectToChangeHandler}
              optionLists={this.state.toCurrencyList}
              currentVal={this.state.toCurrency}
            />
            <InputEl value={this.state.toAmount} disabled />
          </div>
        </div>

        <button
          className="convert-button"
          disabled={!validInputReg.test(this.state.fromAmount!)}
          onClick={this.handleConvertPocket}
        >
          Convert to Pocket
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  fxRate: state.fxRates.fxRates,
});

const mapDispatchToProps = {
  fetchCurrentFXRate,
  convertToPocket,
};

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
