import React, { Component } from 'react'
import axios from 'axios'

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  }

  componentDidMount() {
    this.fetchValues()
    this.fetchIndexes()
  }

  async fetchValues() {
    const { status, data = [] } = await axios.get('/api/values/current')

    if (status >= 200 && status < 300) {
      this.setState({ values: data })
    }
  }

  async fetchIndexes() {
    const { status, data = [] } = await axios.get('/api/values/all')

    if (status >= 200 && status < 300) {
      this.setState({ seenIndexes: data })
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    await axios.post('/api/values', {
      index: this.state.index
    })

    this.setState({ index: '' })
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ')
  }

  renderValues() {
    const entries = []

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      )
    }

    return entries
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>enter you index:</label>
          <input value={this.state.index} onChange={event => this.setState({index: event.target.value})}/>
          <button>Submit</button>
        </form>
        
        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated values:</h3>
        {this.renderValues()}
      </div>
    )
  }
}

export default Fib
