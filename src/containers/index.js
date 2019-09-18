import React, { Component, Fragment } from "react";
import styles from "./styles.scss";

import variance from "../assets/variance.png";
import { sampleVariance } from "../helpers/calculations";

import { Paper, TextField, Button, Card, CardContent } from "@material-ui/core";

class Layout extends Component {
  state = {
    inputText: "",
    varianceAnswer: "",
    squareRootVariance: ""
  };

  calculateHandler(calculation) {
    const [varianceAnswer, squareRootVariance] = sampleVariance(
      this.state.inputText.split(" ")
    );
    this.setState({ varianceAnswer, squareRootVariance });
  }

  render() {
    return (
      <Fragment>
        <h2 className={styles.header}>STAT*2040 Calculator</h2>

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
                onChange={e => this.setState({ inputText: e.target.value })}
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
      </Fragment>
    );
  }
}

export default Layout;
