"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactBootstrap = require("react-bootstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Meme extends _react.default.Component {
  render() {
    const meme = {
      margin: "auto",
      textAlign: "center",
      position: "relative",
      backgroundSize: "100%"
    };
    const h2 = {
      position: "absolute",
      left: 0,
      right: 0,
      margin: "15px 0",
      padding: "0 5px",
      fontFamily: "impact",
      fontSize: "2.5em",
      textTransform: 'uppercase',
      color: "white",
      letterSpacing: "1px",
      textShadow: `2px 2px 0 #000,
            -2px -2px 0 #000,
            2px -2px 0 #000,
            -2px 2px 0 #000,
            0px 2px 0 #000,
            2px 0px 0 #000,
            0px -2px 0 #000,
            -2px 0px 0 #000,
            2px 2px 5px #000`
    };

    const top = _objectSpread({
      top: "25px"
    }, h2);

    const bottom = _objectSpread({
      bottom: "15px"
    }, h2);

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, {
      style: meme
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Image, {
      style: {
        maxWidth: "50%"
      },
      src: this.props.randomImage,
      alt: ""
    }), /*#__PURE__*/_react.default.createElement("div", {
      style: top
    }, this.props.topText), /*#__PURE__*/_react.default.createElement("div", {
      style: bottom
    }, this.props.bottomText)));
  }

}

var _default = Meme;
exports.default = _default;