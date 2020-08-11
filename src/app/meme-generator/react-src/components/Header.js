"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _pepe = _interopRequireDefault(require("../img/pepe.jpg"));

var _Jumbotron = _interopRequireDefault(require("react-bootstrap/Jumbotron"));

var _Container = _interopRequireDefault(require("react-bootstrap/Container"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Header extends _react.default.Component {
  render() {
    const headerStyle = {
      backgroundImage: `url(${_pepe.default})`,
      backgroundPosition: "bottom center",
      height: 100,
      textAlign: "center",
      paddingTop: 10,
      fontFamily: `'Titillium Web', sans-serif`
    };
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("link", {
      href: "https://fonts.googleapis.com/css?family=Titillium+Web:300,400,700",
      rel: "stylesheet"
    }), /*#__PURE__*/_react.default.createElement(_Jumbotron.default, {
      style: headerStyle,
      fluid: true
    }, /*#__PURE__*/_react.default.createElement(_Container.default, {
      fluid: true
    })));
  }

}

var _default = Header;
exports.default = _default;