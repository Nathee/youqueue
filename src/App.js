import React, { Component } from 'react';
import axios from 'axios'

import Youtube from './components/Youtube'

const KEY = 'AIzaSyBntZCctMTREf1BWJ6dKWwAhf-dEJMBrdU'

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      youtubeId: '',
      queues: []
    }
  }

  async addQueue(e) {
    e.preventDefault()
    let videoid = this.state.youtubeId.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if(videoid === null) {
      alert('Your Link is not correct.') 
      return
    }
    let YID = videoid[1]

    let data = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id%2Csnippet&id=${YID}&key=${KEY}`)
      .then(resp => resp.data)
    
    console.log(data)
    
    let newQueues = this.state.queues
    newQueues = newQueues.concat({
      yid : data.items[0].id,
      ytitle: data.items[0].snippet.title,
      thumbnailUrl: data.items[0].snippet.thumbnails.default.url
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
          {
            this.state.queues.length > 0
            ? (
              <Youtube
                  YTid={this.state.queues[0].yid}
                  onStateChange={(e) => this.nextToQueue(e)}
                />
            )
            : ''
          }
          <form onSubmit={e => this.addQueue(e)}>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Press your Youtube Link : )"
                    value={this.state.youtubeId}
                    onChange={e => this.setState({ youtubeId: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-12">
              { this.state.queues.length > 0
                ? <h4>Queue List:</h4>
                : ''
              }
              <ul className="list-group">
                {
                  this.state.queues.map( (queue,key) => {
                    if(key !== 0) {
                      return (
                        <li key={key} className={"list-group-item " + (key === 0? 'active' : '')}>
                          <img
                            src={queue.thumbnailUrl}  alt={queue.ytitle}
                            className="img-thumbnail"
                            style={{ display: 'flex' }}
                          />
                          <span style={{ display: 'flex', flex: 3, padding: '0 10px'}}>
                            {queue.ytitle}
                          </span>
                        </li>
                      )
                    }
                  })
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
