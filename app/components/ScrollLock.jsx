import { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

const cancelScrollEvent = (event) => {
  event.stopImmediatePropagation();
  event.preventDefault();
  event.returnValue = false;
  return false;
};

export default class ScrollLock extends Component {

  static get propTypes() {
    return {
      children: PropTypes.node,
    };
  }

  componentDidMount() {
    this.scrollLock();
  }

  componentDidUpdate() {
    this.scrollLock();
  }

  componentWillUnmount() {
    this.scrollRelease();
  }

  render() {
    return this.props.children;
  }

  scrollLock() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      node.addEventListener('wheel', this.onScrollHandler, false);
    }
  }

  scrollRelease() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      node.removeEventListener('wheel', this.onScrollHandler, false);
    }
  }

  onScrollHandler(event) {
    const node = ReactDOM.findDOMNode(this);
    const scrollTop = node.scrollTop;
    const scrollHeight = node.scrollHeight;
    const height = node.clientHeight;
    const wheelDelta = event.deltaY;
    const isDeltaPositive = wheelDelta > 0;

    if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
      node.scrollTop = scrollHeight;
      return cancelScrollEvent(event);
    } else if (!isDeltaPositive && -wheelDelta > scrollTop) {
      node.scrollTop = 0;
      return cancelScrollEvent(event);
    }
  }
}
