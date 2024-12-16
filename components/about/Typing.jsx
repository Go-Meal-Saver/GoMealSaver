'use client';
import { Component } from 'react';
import Typed from 'typed.js';

class TypedText extends Component {
  componentDidMount() {
    const { strings, typeSpeed, backSpeed, loop } = this.props;

    this.typed = new Typed(this.el, {
      strings,
      typeSpeed,
      backSpeed,
      loop,
    });
  }

  componentWillUnmount() {
    // Destroy Typed instance during cleanup to stop animation
    if (this.typed) {
      this.typed.destroy();
    }
  }

  render() {
    return <span ref={(el) => (this.el = el)} />;
  }
}

export default TypedText;
