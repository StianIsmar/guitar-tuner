import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ButtonGroup from "react-bootstrap/Button";
class StringButtons extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ButtonGroup className="mb-3" aria-label="Basic example">
          <div style={{ borderColor: "inherit" }}>
            {this.props.falseCondition ? (
              <Alert
                variant="danger"
                onClose={() => this.setShow(true)}
                dismissible
              >
                <Alert.Heading style={{ fontSize: "12px" }}>
                  {" "}
                  You need the select a string tune!
                </Alert.Heading>
              </Alert>
            ) : (
              <div></div>
            )}
          </div>
          <Alert></Alert>
          <Button
            style={
              this.props.button_pressed === "E2"
                ? { borderColor: "orange", color: "orange" }
                : { color: "grey" }
            }
            onClick={() => this.props.stringButton("E2")}
            variant="secondary"
          >
            E<sub>2</sub>
          </Button>
          <Button
            style={
              this.props.button_pressed === "A"
                ? { borderColor: "orange", color: "orange" }
                : { color: "grey" }
            }
            onClick={() => this.props.stringButton("A")}
            variant="secondary"
          >
            A
          </Button>
          <Button
            style={
              this.props.button_pressed === "D"
                ? { borderColor: "orange", color: "orange" }
                : { color: "grey" }
            }
            onClick={() => this.props.stringButton("D")}
            variant="secondary"
          >
            D
          </Button>
          <Button
            style={
              this.props.button_pressed === "G"
                ? { borderColor: "orange", color: "orange" }
                : { color: "grey" }
            }
            onClick={() => this.props.stringButton("G")}
            variant="secondary"
          >
            G
          </Button>
          <Button
            style={
              this.props.button_pressed === "B"
                ? { borderColor: "orange", color: "orange" }
                : { color: "grey" }
            }
            onClick={() => this.props.stringButton("B")}
            variant="secondary"
          >
            B
          </Button>
          <Button
            style={
              this.props.button_pressed === "E4"
                ? { borderColor: "orange", color: "orange" }
                : { color: "grey" }
            }
            onClick={() => this.props.stringButton("E4")}
            variant="secondary"
          >
            E<sub>4</sub>
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

StringButtons.propTypes = {};

export default StringButtons;
