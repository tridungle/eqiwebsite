import React, { Component } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import FadeIn from "react-fade-in";

export default class AlertBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      system1: false
    };
  }
  render() {
    var myElements = [];
    for (var i = 0; i < this.props.amount; i++) {
      myElements.push(<p style={{ margin: 0, padding: 0 }}>hello</p>);
    }
    return (
      <div>
        <div
          onClick={() => this.setState({ system1: !this.state.system1 })}
          class="btn btn-outline-danger btn-block mt-3"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <div
                style={{
                  borderRight: "1px solid #c74740",
                  paddingRight: "12px"
                }}
              >
                {this.props.amount}
              </div>
              <p
                style={{
                  marginLeft: "12px",
                  marginBottom: 0,
                  paddingBottom: 0
                }}
              >
                {this.props.desc}
              </p>
            </div>
            {this.state.system1 ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>
        {this.state.system1 ? (
          <div
            style={{
              borderLeft: "1px solid #c74740",
              borderRight: "1px solid #c74740",
              borderBottom: "1px solid #c74740"
            }}
          >
            <FadeIn>{myElements}</FadeIn>
          </div>
        ) : null}
      </div>
    );
  }
}
