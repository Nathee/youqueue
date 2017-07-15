import React, { Component } from 'react';

import Youtube from './components/Youtube'

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      youtubeId: '',
      queues: [
        {
          yid: 'nxGoOsh-Lu0',
          ytitle: null
        },
        {
          yid: 'JVgwkSjescc',
          ytitle: null
        }
      ]
    }
  }

  async addQueue(e) {
    e.preventDefault()
    let newQueues = this.state.queues
    newQueues = newQueues.concat({
      yid :this.state.youtubeId,
      ytitle: null
    })
    await this.setState({
      youtubeId: '',
      queues: newQueues
    })
  }

  async nextToQueue(e) {
    console.log(e)
    if( e.data === 0 ) {
      let newQueues = await this.state.queues
      newQueues.shift()
      e.target.loadVideoById(newQueues[0].yid, 0, 'large')
      await this.setState({
        queues: newQueues
      })
    }
  }
  

  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
        <div className="container">
          <h3>YOUQUEUE</h3>
          <Youtube
            YTid={this.state.queues[0].yid}
            onStateChange={(e) => this.nextToQueue(e)}
          />
          <form onSubmit={e => this.addQueue(e)}>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Press Youtube ID and Enter"
                    value={this.state.youtubeId}
                    onChange={e => this.setState({ youtubeId: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-12">
              <ul className="list-group">
                {
                  this.state.queues.map( (queue,key) => (
                    <li key={key} className={"list-group-item " + (key === 0? 'active' : '')}>
                      {key + 1}. {queue.yid}  
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
