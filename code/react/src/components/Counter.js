import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {
    constructor(props) {
        super(props)
        this.inCrementAsync = this.inCrementAsync.bind(this)
        this.inCrementIfOdd = this.inCrementIfOdd.bind(this)
    }

    inCrementAsync() {
        if(this.props.value % 2 !== 0) {
           this.props.onIncrement()
        }
    }

    inCrementIfOdd() {
        setTimeout(this.props.onIncrement, 1000)
    }

    render() {
        const { value, onIncrement, onDecrement } = this.props
        return (
            <p>
                Clicked: {value} times
                {' '}
                <button onClick={onIncrement}>
                    +
                </button>
                {' '}
                <button onClick={onDecrement}>
                    -
                </button>
                {' '}
                <button onClick={this.inCrementIfOdd}>
                    inCrementIfOdd
                </button>
                {' '}
                <button onClick={this.inCrementAsync}>
                    inCrementAsync
                </button>
            </p>
        )
    }
}

export default Counter