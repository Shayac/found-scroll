'use strict';

exports.__esModule = true;

var _StateStorage = require('farce/lib/StateStorage');

var _StateStorage2 = _interopRequireDefault(_StateStorage);

var _PropTypes = require('found/lib/PropTypes');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _scrollBehavior = require('scroll-behavior');

var _scrollBehavior2 = _interopRequireDefault(_scrollBehavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STORAGE_NAMESPACE = '@@scroll';

var propTypes = {
  shouldUpdateScroll: _propTypes2.default.func,
  renderArgs: _propTypes2.default.shape({
    location: _propTypes2.default.object.isRequired,
    router: _PropTypes.routerShape.isRequired
  }).isRequired,
  children: _propTypes2.default.element
};

var ScrollManager = function (_React$Component) {
  _inherits(ScrollManager, _React$Component);

  function ScrollManager(props, context) {
    _classCallCheck(this, ScrollManager);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _initialiseProps.call(_this);

    var renderArgs = props.renderArgs;
    var router = renderArgs.router;


    _this.scrollBehavior = new _scrollBehavior2.default({
      addTransitionHook: router.addTransitionHook,
      stateStorage: new _StateStorage2.default(router, STORAGE_NAMESPACE),
      getCurrentLocation: function getCurrentLocation() {
        return _this.props.renderArgs.location;
      },
      shouldUpdateScroll: _this.shouldUpdateScroll
    });

    _this.scrollBehavior.updateScroll(null, renderArgs);
    return _this;
  }

  ScrollManager.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    var renderArgs = nextProps.renderArgs;

    var prevRenderArgs = this.props.renderArgs;

    if (renderArgs.location === prevRenderArgs.location) {
      return;
    }

    this.scrollBehavior.updateScroll(prevRenderArgs, renderArgs);
  };

  ScrollManager.prototype.componentWillUnmount = function componentWillUnmount() {
    this.scrollBehavior.stop();
  };

  ScrollManager.prototype.render = function render() {
    return this.props.children;
  };

  return ScrollManager;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.shouldUpdateScroll = function (prevRenderArgs, renderArgs) {
    var shouldUpdateScroll = _this2.props.shouldUpdateScroll;

    if (!shouldUpdateScroll) {
      return true;
    }

    // Hack to allow access to ScrollBehavior internals (e.g. stateStorage).
    return shouldUpdateScroll.call(_this2.scrollBehavior, prevRenderArgs, renderArgs);
  };
};

ScrollManager.propTypes = propTypes;

exports.default = ScrollManager;
module.exports = exports['default'];