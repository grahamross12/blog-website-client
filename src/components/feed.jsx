import React, { Component } from "react";
import BlogItem from "./blogItem.jsx";
import "./css/feed.css";

class Feed extends Component {
  constructor() {
    super();
    this.state = { blogs: null };
  }
  componentDidMount = () => {
    this.getBlogsFromApi();
  };
  getBlogsFromApi = async () => {
    try {
      let response;
      if (this.props.username) {
        const apiUrl =
          process.env.REACT_APP_SERVER_DOMAIN +
          "/api/users/" +
          this.props.username;
        response = await fetch(apiUrl);
      } else if (this.props.searchQuery) {
        const apiUrl =
          process.env.REACT_APP_SERVER_DOMAIN +
          "/api/blogs/search/" +
          this.props.searchQuery;
        response = await fetch(apiUrl);
      } else if (this.props.tagQuery) {
        const apiUrl =
          process.env.REACT_APP_SERVER_DOMAIN +
          "/api/blogs/tag/" +
          this.props.tagQuery;
        response = await fetch(apiUrl);
      } else {
        const apiUrl = process.env.REACT_APP_SERVER_DOMAIN + "/api/blogs";
        response = await fetch(apiUrl);
      }
      const blogsData = await response.json();
      this.setState({ blogs: blogsData });
    } catch (err) {
      console.error(err);
    }
  };

  findUsername(blog) {
    if (blog.user) {
      return blog.user.username;
    }
    return "error";
  }

  findPicture(blog) {
    if (blog.user) {
      return blog.user.picture;
    }
    return "";
  }

  render() {
    return (
      <div>
        {this.state.blogs ? (
          this.state.blogs[0] ? (
            this.state.blogs.map((blog, index) => (
              <BlogItem
                key={index}
                blog={blog}
                user={this.props.user}
              ></BlogItem>
            ))
          ) : (
            <div>
              <h2 id="no-results">No results</h2>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Feed;
