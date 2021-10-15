import React, { Component } from "react";
import axios from "axios";

class TagSuggestions extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: null };
  }

  getBlogSuggestions = async () => {
    const apiUrl = process.env.REACT_APP_SERVER_DOMAIN + "/api/tags";
    const tags = await axios.get(apiUrl);
    this.setState({ tags: tags.data });
  };

  componentDidMount() {
    this.getBlogSuggestions();
  }

  renderBlogSuggestions = () => {
    if (!this.state.tags) return;
    let tagsArray = [];
    this.state.tags.forEach((tag, idx) => {
      tagsArray.push(
        <div key={idx} className="tag-menu-item-div">
          <a href={"/?tag=" + tag.tag}>
            <div className="tag-menu-item">{"#" + tag.tag}</div>
          </a>
        </div>
      );
    });
    return tagsArray;
  };

  render() {
    return (
      <div className="suggestionsDiv blogSuggestionsDiv">
        <div className="sidebar-title">Tags</div>
        {this.renderBlogSuggestions()}
      </div>
    );
  }
}

export default TagSuggestions;
