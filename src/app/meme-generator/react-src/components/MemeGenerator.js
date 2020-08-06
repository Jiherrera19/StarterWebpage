"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _Meme = _interopRequireDefault(require("./Meme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MemeGenerator extends _react.default.Component {
  constructor() {
    super();
    this.state = {
      topText: '',
      bottomText: '',
      randomImage: '',
      allMemeImgs: []
    };
    this.hangleChange = this.hangleChange.bind(this);
    this.setRandomImg = this.setRandomImg.bind(this);
  }

  componentDidMount() {
    const apiUrl = "https://api.imgflip.com/get_memes";
    fetch(apiUrl).then(response => response.json()).then(response => {
      this.setState({
        allMemeImgs: response.data.memes
      });
      let url = response.data.memes[Math.floor(Math.random() * response.data.memes.length)].url;
      this.setRandomImg(url);
    });
  }

  hangleChange(event) {
    const {
      name,
      value
    } = event.target;
    this.setState({
      [name]: value
    });
  }

  setRandomImg(url) {
    let callback;

    if (typeof url === "string") {
      callback = {
        randomImage: url
      };
    } else {
      callback = prevState => {
        return {
          randomImage: prevState.allMemeImgs[Math.floor(Math.random() * prevState.allMemeImgs.length)].url
        };
      };
    }

    this.setState(callback);
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
      xs: 9
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Group, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, {
      value: this.state.topText,
      type: "text",
      name: "topText",
      placeholder: "Top Text",
      onChange: this.hangleChange
    }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, {
      value: this.state.bottomText,
      type: "text",
      name: "bottomText",
      placeholder: "Bottom Text",
      onChange: this.hangleChange
    }))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Group, null, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        height: "100%",
        position: "relative"
      }
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      style: {
        position: "absolute",
        top: "50%",
        transform: "translateY(50%)"
      },
      onClick: this.setRandomImg
    }, "Generate New Img")))))))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react.default.createElement(_Meme.default, {
      ref: this.props.memeRef,
      randomImage: this.state.randomImage,
      topText: this.state.topText,
      bottomText: this.state.bottomText
    }))));
  }

}

var _default = MemeGenerator;
exports.default = _default;