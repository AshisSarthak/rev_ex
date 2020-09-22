import React from "react";
import { connect } from "react-redux";
import { fetchCurrentFXRate } from "./homeAction";
import "./Home.css";

export type HomeProps = {
  fxRate: any;
  fetchCurrentFXRate: Function;
};

export type HomeState = {
  currentPage: string;
};

export class Home extends React.Component<HomeProps, HomeState> {
  state = {
    currentPage: "home",
  };

  componentDidMount() {
    this.props.fetchCurrentFXRate();
  }

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
        <section>{JSON.stringify(this.props.fxRate)}</section>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  fxRate: state.fxRates.fxRates,
});

const mapDispatchToProps = {
  fetchCurrentFXRate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
