import React, { Component } from "react";
import PostDisplay from "../PostDisplay/PostDisplay";
import PostEditor from "../PostEditor/PostEditor";
import Header from "../Header/Header";

import { Panel, ListGroup } from "react-bootstrap";
import "./Chat.css";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.postsCollection = this.props.firestore.collection("posts");
    this.unsubscribe = null;
    this.state = {
      postData: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.postsCollection.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = snapshot => {
    const postData = [];
    snapshot.forEach(doc => {
      const { postBody, postUser, postAvatar, postUID, postTime } = doc.data();
      postData.push({
        key: doc.id,
        postBody,
        postUser,
        postAvatar,
        postUID,
        postTime
      });
    });
    this.setState({
      postData
    });
  };

  render() {
    const { user } = this.props;
    const { postData } = this.state;
    return (
      <div>
        <div className="chatPanel">
          <Panel bsStyle="info">
            <Panel.Heading>
              <Panel.Title>
                <Header user={user} />
              </Panel.Title>
            </Panel.Heading>
            <ListGroup>
              {postData
                .sort((a, b) => a.postTime - b.postTime)
                .map((post, id) => {
                  return (
                    <PostDisplay
                      key={id}
                      user={user}
                      post={post}
                    />
                  );
                })}
            </ListGroup>
            <Panel.Footer>
              <PostEditor
                user={user}
                postsCollection={this.postsCollection}
              />
            </Panel.Footer>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Chat;
