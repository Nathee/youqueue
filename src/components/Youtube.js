import React, { Component } from 'react'

let loadYT

export default class YouTube extends Component {
  componentDidMount () {
    if (!loadYT) {
      loadYT = new Promise((resolve) => {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        window.onYouTubeIframeAPIReady = () => resolve(window.YT)
      })
    }
    loadYT.then((YT) => {
      this.player = new YT.Player(this.youtubePlayerAnchor, {
        height: this.props.height || 200,
        width: this.props.width || '100%',
        videoId: this.props.YTid,
        events: {
          onStateChange: this.onPlayerStateChange
        }
      })
    })
  }

  onPlayerStateChange = (e) => {
    if (typeof this.props.onStateChange === 'function') {
      this.props.onStateChange(e)
    }
  }

  render () {
    return (
      <section className='youtubeComponent-wrapper'>
        <div ref={(r) => { this.youtubePlayerAnchor = r }}></div>
      </section>
    )
  }
}