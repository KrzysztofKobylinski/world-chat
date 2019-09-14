import React, { Component } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { chooseWhatToShow, noAvatar } from "../../helpers";

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postBody: "",
      postUser: "",
      postAvatar: ""
    };
  }

  handlePostEditorInputChange = e => {
    const { user } = this.props;
    this.setState({
      postBody: e.target.value,
      postUser: chooseWhatToShow(user.displayName, user.email),
      postAvatar: chooseWhatToShow(user.photoURL, noAvatar)
    });
  };

  createPost = e => {
    e.preventDefault();
    const { user } = this.props;
    const { postBody, postUser, postAvatar } = this.state;
    if (postBody) {
      this.props.postsCollection.add({
        postBody,
        postUser,
        postAvatar,
        postUID: user.uid,
        postTime: new Date().getTime()
      });

      this.setState({
        postBody: "",
        postUser: "",
        postAvatar: ""
      });
    }
  };

  render() {
    return (
      <Form inline>
        <FormControl
          value={this.state.postBody}
          onChange={this.handlePostEditorInputChange}
        />
        <Button onClick={this.createPost}>Wyślij</Button>
      </Form>
    );
  }
}

export default PostEditor;
