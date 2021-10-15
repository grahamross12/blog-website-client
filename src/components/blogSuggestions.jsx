import React, { Component } from "react";
import axios from "axios";

class BlogSuggestions extends Component {
  constructor(props) {
    super(props);
    this.state = { blogs: null };
  }

  getBlogSuggestions = async () => {
    const apiUrl =
      process.env.REACT_APP_SERVER_DOMAIN + "/api/blogs/suggestions";
    const blogs = await axios.get(apiUrl);
    this.setState({ blogs: blogs.data });
  };

  componentDidMount() {
    this.getBlogSuggestions();
  }

  renderBlogSuggestions = () => {
    if (!this.state.blogs) return;
    let suggestionsArray = [];
    this.state.blogs.forEach((blog, idx) => {
      suggestionsArray.push(
        <div key={idx} className="blog-list-item">
          <hr className="list-divider"></hr>
          <a
            className="blog-list-link"
            href={
              "http://localhost:3000/user/" +
              blog.user.username +
              "/" +
              blog.url
            }
          >
            <div className="blog-list-link-div">{blog.title}</div>
          </a>
        </div>
      );
    });
    return suggestionsArray;
  };

  render() {
    return (
      <div className="suggestionsDiv blogSuggestionsDiv">
        <div className="sidebar-title">Suggestions</div>
        {this.renderBlogSuggestions()}
        <hr className="list-divider"></hr>
        <div className="bottom-margin" />
      </div>
    );
  }
}

export default BlogSuggestions;
