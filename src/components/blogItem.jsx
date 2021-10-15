import React, { Component } from "react";
import "./css/blogItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";

class BlogItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveActive: false,
      saves: this.props.blog.saves,
    };
  }
  convertDate = (datestring) => {
    const date = new Date(datestring);
    const monthNo = date.getUTCMonth();
    const day = date.getUTCDate();
    const monthStrDict = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };
    const dateFormat = day + " " + monthStrDict[monthNo];
    return dateFormat;
  };

  findUserId = async (username) => {
    const userid = await axios.get(
      process.env.REACT_APP_SERVER_DOMAIN + "/api/users/username/" + username
    );
    return userid.data.id;
  };

  activateSavedBlogs = async () => {
    if (this.props.user) {
      const username = this.props.user["http://localhost:3000/username"];
      const userid = await this.findUserId(username);
      this.props.blog.savedBlogs.forEach((savedBlog) => {
        if (savedBlog.userid === userid) {
          this.setState({ saveActive: true });
          return;
        }
      });
    }
  };

  componentDidMount() {
    this.activateSavedBlogs();
  }

  saveBlog = async () => {
    if (!this.props.user) {
      this.props.auth0.loginWithRedirect();
      return;
    }
    if (!this.state.saveActive) {
      this.setState({
        saveActive: !this.state.saveActive,
        saves: (this.state.saves += 1),
      });
      await axios.post(
        process.env.REACT_APP_SERVER_DOMAIN +
          "/api/savedblogs/" +
          this.props.blog.user.id +
          "/" +
          this.props.blog.id
      );
    } else {
      this.setState({
        saveActive: !this.state.saveActive,
        saves: (this.state.saves -= 1),
      });
      await axios.delete(
        process.env.REACT_APP_SERVER_DOMAIN +
          "/api/savedblogs/" +
          this.props.blog.user.id +
          "/" +
          this.props.blog.id
      );
    }
    const apiUrl =
      process.env.REACT_APP_SERVER_DOMAIN +
      "/api/blogs/" +
      this.props.blog.id +
      "/saves/" +
      this.state.saves;
    console.log(apiUrl);
    await axios.put(apiUrl);
  };

  renderTags = () => {
    let tags = [];
    this.props.blog.tags.forEach((tag, idx) => {
      tags.push(
        <div className="tag tag-small" key={idx}>
          <a className="no-style" href={"/?tag=" + tag.tag.tag}>
            {"#" + tag.tag.tag}
          </a>
        </div>
      );
    });
    return tags;
  };

  render() {
    return (
      <div className="blogItemDiv rounded-div truncate-text">
        <div className="blog-post-top">
          <div className="f-left full-height">
            <div className="profile-picture-div user-info-picture">
              <a
                href={"http://localhost:3000/user/" + this.props.blog.username}
              >
                <img
                  id="profile-picture"
                  src={this.props.blog.user.picture}
                  alt="Profile"
                ></img>
              </a>
            </div>

            <div className="f-right stack-user-info full-width">
              <div className="full-width user-info">
                <a
                  className="username-link"
                  href={
                    "http://localhost:3000/user/" +
                    this.props.blog.user.username
                  }
                >
                  {this.props.blog.user.username}
                </a>
              </div>
              <div className="full-width user-info ">
                <time className="date" dateTime={this.props.blog.createdAt}>
                  {this.convertDate(this.props.blog.createdAt)}
                </time>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-post-mid truncate-text">
          <a
            href={
              "http://localhost:3000/user/" +
              this.props.blog.user.username +
              "/" +
              this.props.blog.url
            }
            className="title-link truncate-text"
          >
            {this.props.blog.title}
          </a>
        </div>
        <div className="blog-post-bottom">
          <div className="tags-feed">{this.renderTags()}</div>
          <div className="save-info-div">
            <button
              onClick={() => {
                this.saveBlog();
              }}
              className="save-icon"
              color="white"
            >
              <div className="save-counter">{this.state.saves}</div>
              <FontAwesomeIcon
                className={
                  this.state.saveActive ? "save-icon-fa active" : "save-icon-fa"
                }
                size="lg"
                icon={faStar}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth0(BlogItem);
