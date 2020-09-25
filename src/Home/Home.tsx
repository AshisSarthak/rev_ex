import React from "react";
import { connect } from "react-redux";
import "./Home.css";
import Pocket from "./Pockets/Pockets";
import Exchange from "./Exchange/Exchange";
import { CURRENCYS } from "../mockData";

export type HomeProps = {
  gbpPocket: any;
  usdPocket: any;
  eurPocket: any;
};

export type HomeState = {
  currentPage: string;
};

export class Home extends React.Component<HomeProps, HomeState> {
  state = {
    currentPage: "home",
  };

  getHeaderClass = (headerPage: string) => {
    let headerString = "header-nav";
    if (this.state.currentPage === headerPage) {
      headerString += " selected-nav";
    }
    return headerString;
  };

  updateHeaderNav = (headerPage: string) => {
    if (this.state.currentPage !== headerPage) {
      this.setState({
        currentPage: headerPage,
      });
    }
  };

  render() {
    const { gbpPocket, usdPocket, eurPocket } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="home">
        <header className="home-header">
          <nav
            className={this.getHeaderClass("home")}
            onClick={() => this.updateHeaderNav("home")}
          >
            Home
          </nav>
          <nav
            className={this.getHeaderClass("exchange")}
            onClick={() => this.updateHeaderNav("exchange")}
          >
            Exchange
          </nav>
        </header>
        {currentPage === "home" ? (
          <>
            <div className="pockets-header">Your Pockets</div>
            <section className="pockets-details">
              <Pocket pocket={gbpPocket} currency={CURRENCYS.GBP}></Pocket>
              <Pocket pocket={usdPocket} currency={CURRENCYS.USD}></Pocket>
              <Pocket pocket={eurPocket} currency={CURRENCYS.EUR}></Pocket>
            </section>
          </>
        ) : (
          <Exchange />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  fxRate: state.fxRates.fxRates,
  gbpPocket: state.fxRates.pockets.GBP,
  usdPocket: state.fxRates.pockets.USD,
  eurPocket: state.fxRates.pockets.EUR,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
