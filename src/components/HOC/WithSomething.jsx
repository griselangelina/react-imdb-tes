import React from 'react';

export function withSomething(ComposedComponent) {
  class WithSomething extends React.Component {
    state = {}; // stuff in here

    componentDidMount() {
      // do some stuff..
      console.log('I am doing something');
    }

    render() {
      return <ComposedComponent {...this.props} {...this.state} />;
    }
  }

  return WithSomething;
}
