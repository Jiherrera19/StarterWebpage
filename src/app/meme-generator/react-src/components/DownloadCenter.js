"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactComponentExportImage = require("react-component-export-image");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DownloadCenter extends _react.default.Component {
  render() {
    const buttonStyle = {
      textAlign: "center",
      marginTop: 15
    };
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, {
      style: buttonStyle
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      onClick: () => (0, _reactComponentExportImage.exportComponentAsJPEG)(this.props.memeRef)
    }, "Export As JPEG"), /*#__PURE__*/_react.default.createElement("p", null, " "), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      onClick: () => (0, _reactComponentExportImage.exportComponentAsPDF)(this.props.memeRef)
    }, "Export As PDF"), /*#__PURE__*/_react.default.createElement("p", null, " "), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      onClick: () => (0, _reactComponentExportImage.exportComponentAsPNG)(this.props.memeRef)
    }, "Export As PNG")));
  }

}

var _default = DownloadCenter;
exports.default = _default;