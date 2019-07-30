import React, { Component } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import FadeIn from "react-fade-in";
import logo from "../images/logo.png";
import Lottie from "react-lottie";
import * as animationData from "../images/pulse.json";
import * as animationData2 from "../images/check.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: animationData2.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default class Login extends Component {
  render() {
    if (this.props.loader === "first") {
      setTimeout(
        function() {
          this.props.changeLoader("second");
        }.bind(this),
        //3000
        1
      );
    }
    if (this.props.loader === "second") {
      setTimeout(
        function() {
          this.props.changeStatusAndLoader("map", undefined);
        }.bind(this),
        //860
        1
      );
    }
    return (
      <div>
        <div class="content">
          <ScrollAnimation
            offset={500}
            duration={0.5}
            animateIn="fadeIn"
            animateOut="fadeOut"
          >
            <canvas id="3D-background-three-canvas5" />
            <div class="logo">
              <FadeIn>
                {!this.props.loader ? (
                  <div>
                    <img src={logo} alt="logo" />
                    <p class="mt-1">Early earthquake detection systems</p>
                  </div>
                ) : null}
                <div class="d-flex justify-content-center align-items-center text-center">
                  {this.props.status === "loading" ? (
                    <div>
                      <FadeIn>
                        <div
                          style={{ width: "250px" }}
                          class="d-flex justify-content-around align-items-center mt-4"
                        >
                          <h6
                            style={{
                              color: "white",
                              padding: 0,
                              margin: 0
                            }}
                          >
                            Loading Predicamentor
                          </h6>
                          {this.props.loader === "first" ? (
                            <FadeIn>
                              <Lottie options={defaultOptions} width={70} />
                            </FadeIn>
                          ) : (
                            <FadeIn>
                              <Lottie options={defaultOptions2} width={70} />
                            </FadeIn>
                          )}
                        </div>
                      </FadeIn>
                    </div>
                  ) : (
                    <FadeIn>
                      <div class="mt-2">
                        <input
                          class="m-1 loginInput"
                          type="text"
                          placeholder="Username"
                        />
                        <br />
                        <input
                          class="m-1 loginInput"
                          type="text"
                          placeholder="Password"
                        />
                        <br />
                        <div
                          onClick={() =>
                            this.props.changeStatusAndLoader("loading", "first")
                          }
                          style={{
                            cursor: "pointer",
                            fontSize: "12px",
                            color: "white",
                            backgroundColor: "#c74740",
                            width: "200px",
                            padding: "5px !important"
                          }}
                          class="btn font-weight-bold mt-1"
                        >
                          Enter
                        </div>
                      </div>
                    </FadeIn>
                  )}
                </div>
              </FadeIn>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    );
  }
}
