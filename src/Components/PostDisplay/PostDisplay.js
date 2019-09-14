import React from 'react'
import './PostDisplay.css'
import { ListGroupItem, Button } from 'react-bootstrap'
import { isPoster } from '../../libs/helpers'
import _ from 'lodash'
import moment from 'moment'
import ColorHash from 'color-hash'

import 'flag-icon-css/css/flag-icon.min.css'

const PostDisplay = props => {
  const { translatedText,originalText} = props.post
  const bodyToShow = (translatedText) ? translatedText : originalText
  var colorHash = new ColorHash({ lightness: 0.8 })
  colorHash = colorHash.rgb(props.post.postUser)
  colorHash.push(0.2)
  let flagClassName = 'flag flag-icon flag-icon-'
  return (
    <ListGroupItem>
      <div className="postDisplay" style={{ backgroundColor: `rgba(${_.join(colorHash, ',')})` }}>
        <div className="photoPost" style={{ backgroundImage: `url(${props.post.postAvatar})` }} />
        <div className="post">
          <div className="info">
            <div>
              {props.post.postUser}
              <span class={flagClassName.concat(props.post.detectedSourceLanguage)}></span>
            </div>
            <div>{moment(props.post.postTime).format('HH:MM:SS DD/MM/YYYY')}</div>
            {/* <div>{isPoster(props.post.postUID, props.user.uid)}</div> */}
          </div>
          <div className="text">{bodyToShow}</div>
        </div>
      </div>
    </ListGroupItem>
  )
} 

export default PostDisplay
