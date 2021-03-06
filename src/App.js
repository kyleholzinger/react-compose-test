import React, { Component, Fragment } from 'react'
import compose from '@kyleholzinger/react-compose'

import './App.css'
import Dump from './Dump'

class MousePosition extends Component {
  render() {
    return <Fragment>{this.props.children({ x: 300, y: 427 })}</Fragment>
  }
}

class Subscription extends Component {
  render() {
    return <Fragment>{this.props.children({ data: ["note 1", "note 2"] })}</Fragment>
  }
}

class Validate extends Component {
  render() {
    return <Fragment>{this.props.children({ predicate: x => (x < 10) })}</Fragment>
  }
}

const ComposedComponent = compose([
  <MousePosition relative={true} />,
  <Subscription url="/api/notes" />,
  <Validate />
])

class App extends Component {
  render() {
    return (
      <ComposedComponent>
        {(...args) => (
          <div>
            The values passed were: <Dump allArgs={args} />
          </div>
        )}
      </ComposedComponent>
    )
  }
}

class App2 extends Component {
  render() {
    return (
      <MousePosition relative>
        {
          (mousePosition) => (
            <Subscription url="">
              {
                (data) => (
                  <Validate>
                    {
                      (err) => (
                        <div>
                          The values passed were: <Dump allArgs={[mousePosition, data, err]} />
                        </div>
                      )
                    }
                  </Validate>
                )
              }
            </Subscription>
          )
        }
      </MousePosition>
    )
  }
}

export default App
