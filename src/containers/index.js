import React, { Component, Fragment } from "react";
import { Paper, TextField, Button, Card, CardContent } from "@material-ui/core";
import styles from "./styles.scss";

import variance from "../assets/variance.png";
import MAD from "../assets/MAD.png";
import mean from "../assets/mean.png";

import {
  sampleVariance,
  meanAvgDeviation,
  zScore,
  meanMedianMode
} from "../helpers/calculations";

class Layout extends Component {
  state = {
    varianceObservations: "",
    varianceAnswer: "",
    squareRootVariance: "",

    madObservations: "",
    madAnswer: "",

    zScoreVal: "",
    zScoreObservations: "",
    zScoreAnswer: "",

    mmmObservations: "",
    mmmVal: [], // 0: mean, 1: median, 2: mode,
    mmmOutliers: ""
  };

  calculateHandler(calculation) {
    switch (calculation) {
      case "variance":
        const [varianceAnswer, squareRootVariance] = sampleVariance(
          this.state.varianceObservations.split(" ")
        );
        this.setState({ varianceAnswer, squareRootVariance });
        break;

      case "mad":
        const madAnswer = meanAvgDeviation(
          this.state.madObservations.split(" ")
        );
        this.setState({ madAnswer });
        break;

      case "zScore":
        const zScoreAnswer = zScore(
          this.state.zScoreVal,
          this.state.zScoreObservations.split(" ")
        );
        this.setState({ zScoreAnswer });
        break;

      case "mmm":
        const mmmVal = meanMedianMode(
          this.state.mmmObservations.split(" "),
          this.state.mmmOutliers.split(" ")
        );
        this.setState({ mmmVal });
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <Fragment>
        <h2 className={styles.header}>STAT*2040 Calculator</h2>

        {/* Variance */}
        <Paper className={styles.calculation}>
          <h4 className={styles.calcHeader}>Sample Variance</h4>
          <div className={styles.formulaContainer}>
            <div className={styles.formulaBox}>
              <b>Formula:</b>
              <img className={styles.formulaPic} src={variance} />
            </div>
            <div className={styles.inputBox}>
              <TextField
                id="standard-textarea"
                label={`Enter all observations (separated by spaces)`}
                multiline
                className={styles.textField}
                margin="normal"
                onChange={e =>
                  this.setState({ varianceObservations: e.target.value })
                }
              />
            </div>
          </div>
          <div className={styles.submitBox}>
            <Card className={styles.card}>
              <CardContent>
                Answer:
                <br />
                <br />
                {this.state.varianceAnswer}
                {this.state.varianceAnswer.length === 0 ? (
                  ""
                ) : (
                  <span>
                    {" "}
                    units <sup>2</sup>
                  </span>
                )}
                <br />
                <br />
                Standard Deviation:
                <br />
                <br />
                {this.state.squareRootVariance}
                {this.state.squareRootVariance.length === 0 ? "" : " units"}
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.calculateHandler("variance")}
            >
              Calculate Variance
            </Button>
          </div>
        </Paper>

        {/* Mean Absolute Deviation */}
        <Paper className={styles.calculation}>
          <h4 className={styles.calcHeader}>Mean Absolute Deviation (MAD)</h4>
          <div className={styles.formulaContainer}>
            <div className={styles.formulaBox}>
              <b>Formula:</b>
              <img className={styles.formulaPic} src={MAD} />
            </div>
            <div className={styles.inputBox}>
              <TextField
                id="standard-textarea"
                label={`Enter all observations (separated by spaces)`}
                multiline
                className={styles.textField}
                margin="normal"
                onChange={e =>
                  this.setState({ madObservations: e.target.value })
                }
              />
            </div>
          </div>
          <div className={styles.submitBox}>
            <Card className={styles.card}>
              <CardContent>
                Answer:
                <br />
                <br />
                {this.state.madAnswer}
                {this.state.madAnswer.length === 0 ? "" : " units"}
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.calculateHandler("mad")}
            >
              Calculate Mean Absolute Deviation
            </Button>
          </div>
        </Paper>

        {/* z-score */}
        <Paper className={styles.calculation}>
          <h4 className={styles.calcHeader}>z-score</h4>
          <div className={styles.formulaContainer}>
            <div className={styles.formulaBox}>
              <b>Formula:</b>
              <img className={styles.formulaPic} src={MAD} />
            </div>
            <div className={styles.inputBox}>
              <TextField
                id="standard-textarea"
                label={`Enter ith observation value`}
                multiline
                className={styles.textField}
                margin="normal"
                onChange={e => this.setState({ zScoreVal: e.target.value })}
              />
              <TextField
                id="standard-textarea"
                label={`Enter all observations`}
                multiline
                className={styles.textField}
                margin="normal"
                onChange={e =>
                  this.setState({ zScoreObservations: e.target.value })
                }
              />
            </div>
          </div>
          <div className={styles.submitBox}>
            <Card className={styles.card}>
              <CardContent>
                Answer:
                <br />
                <br />
                {this.state.zScoreAnswer}
                {this.state.zScoreAnswer.length === 0 ? "" : " units"}
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.calculateHandler("zScore")}
            >
              Calculate Mean Absolute Deviation
            </Button>
          </div>
        </Paper>

        {/* Mean, Median, Mode */}
        <Paper className={styles.calculation}>
          <h4 className={styles.calcHeader}>Mean Median and Mode</h4>
          <div className={styles.formulaContainer}>
            <div className={styles.formulaBox}>
              <b>Formula:</b>
              <img className={styles.formulaPic} src={mean} />
            </div>
            <div className={styles.inputBox}>
              <TextField
                id="standard-textarea"
                label={`Enter all observations (separated by spaces)`}
                multiline
                className={styles.textField}
                margin="normal"
                onChange={e =>
                  this.setState({ mmmObservations: e.target.value })
                }
              />
              <TextField
                id="standard-textarea"
                label={`Outlier(s) to be removed (separated by spaces)`}
                multiline
                className={styles.textField}
                margin="normal"
                onChange={e => this.setState({ mmmOutliers: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.submitBox}>
            <Card className={styles.card}>
              <CardContent>
                Mean: {this.state.mmmVal[0]}
                <br />
                <br />
                Median: {this.state.mmmVal[1]}
                <br />
                <br />
                Mode(s):{" "}
                {this.state.mmmVal[2] && this.state.mmmVal[2].join(" ")}
                <br />
                <br />
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.calculateHandler("mmm")}
            >
              Calculate Variance
            </Button>
          </div>
        </Paper>
      </Fragment>
    );
  }
}

export default Layout;
