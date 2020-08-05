"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _react = _interopRequireDefault(require("react"));

var _Header = _interopRequireDefault(require("./components/Header"));

var _MemeGenerator = _interopRequireDefault(require("./components/MemeGenerator"));

var _DownloadCenter = _interopRequireDefault(require("./components/DownloadCenter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App extends _react.default.Component {
  constructor() {
    super();
    this.memeRef = /*#__PURE__*/_react.default.createRef();
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_MemeGenerator.default, {
      memeRef: this.memeRef
    }), /*#__PURE__*/_react.default.createElement(_DownloadCenter.default, {
      memeRef: this.memeRef
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("p", {
      style: {
        textAlign: "center"
      }
    }, "This Component was made with react and compiled down into javascript so it could be injected into this Angular applicaiton. For source code see github.com/jiherrera19/ReactPractice and see the meme-generator branch"));
  }

}

exports.App = App;