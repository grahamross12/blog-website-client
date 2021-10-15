import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./css/new.css";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { SelectTags } from "../components/";
import { withRouter } from "react-router";

function titleToUrl(title) {
  var titleFormat = title
    .trim() // remove whitespaces at the start and end of string
    .toLowerCase()
    .replace(/^-+/g, "") // remove one or more dash at the start of the string
    .replace(/[^\w-]+/g, "-") // convert any on-alphanumeric character to a dash
    .replace(/-+/g, "-") // convert consecutive dashes to singuar one
    .replace(/-+$/g, ""); // remove one or more dash at the end of the string
  if (titleFormat === "") titleFormat = "1";
  return titleFormat;
}

async function checkBlogUrl(url) {
  const queryUrl =
    process.env.REACT_APP_SERVER_DOMAIN + "/api/blogs/blogUrl/" + url;
  // Check if formatted title is the same as another title by the same user
  const response = await axios.get(queryUrl);
  return response.data;
}

async function findSimilarUrl(url) {
  let newUrl = url;
  var idx = 1;
  while ((await checkBlogUrl(newUrl)) === false) {
    newUrl = url + "-" + idx;
    idx += 1;
  }
  return newUrl;
}

class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      tags: null,
      maxTags: false,
      selectedTags: new Set(),
      noTitle: false,
      noContent: false,
    };
  }

  publishBlog = async (event) => {
    event.preventDefault();
    const username = this.props.user["http://localhost:3000/username"];
    const title = event.target.form[0].value;
    const content = event.target.form[2].value;
    if (!title) {
      this.setState({ noTitle: true });
    }
    if (!content) {
      this.setState({ noContent: true });
    }
    if (this.state.noTitle || this.state.noContent) {
      console.log("returned");
      return;
    }
    const url = titleToUrl(title);
    const newUrl = await findSimilarUrl(url);
    const findTagIds = () => {
      let tagsArray = [];
      this.state.selectedTags.forEach((selectedTag) => {
        this.state.tags.forEach((tag) => {
          if (selectedTag === tag.tag) {
            tagsArray.push(tag.id);
          }
        });
      });
      return tagsArray;
    };
    const tagIds = findTagIds();
    const blog = {
      username: username,
      title: title,
      content: content,
      url: newUrl,
      tags: tagIds,
    };
    console.log(blog);
    const apiUrl = process.env.REACT_APP_SERVER_DOMAIN + "/api/blogs";
    const response = await axios.post(apiUrl, blog);
    if (response.data) {
      this.setState({ redirect: true });
    }
  };

  componentDidMount = () => {
    const getTags = async () => {
      const apiUrl = process.env.REACT_APP_SERVER_DOMAIN + "/api/tags";
      let tags = await axios.get(apiUrl);
      this.setState({ tags: tags.data });
    };
    getTags();
  };

  handleAddTag = (event) => {
    if (this.state.selectedTags.size >= 4) {
      this.setState({ maxTags: true });
      return;
    }
    this.setState({
      selectedTags: this.state.selectedTags.add(event.target.value),
    });
  };

  handleDeleteTag = (tag) => {
    let newSelectedTags = new Set();
    this.state.selectedTags.forEach((selectedTag) => {
      if (selectedTag !== tag) {
        newSelectedTags.add(selectedTag);
      }
    });
    this.setState({ selectedTags: newSelectedTags, maxTags: false });
  };

  renderErrors = () => {
    if (this.state.noTitle || this.state.noContent) {
      return (
        <div className="error-messages">
          <h3 className="error-title">Error</h3>
          {this.state.noTitle ? (
            <div className="warning">Title cannot be blank</div>
          ) : (
            ""
          )}
          {this.state.noContent ? (
            <div className="warning">Content cannot be blank</div>
          ) : (
            ""
          )}
        </div>
      );
    }
  };

  render() {
    if (this.state.redirect) {
      console.log(this.props);
      this.props.history.push("/");
      return null;
    }
    return (
      <Container>
        <Row>
          <Col />
          <Col sm="12" md="10" lg="8">
            <div id="postFormDiv">
              <form className="post-form-element">
                <div id="post-content" className="rounded-div">
                  {this.renderErrors()}
                  <div className="post-form post-form-title">
                    <TextareaAutosize
                      style={{ height: "100% !important" }}
                      id="title-input"
                      type="text"
                      name="title"
                      placeholder="Title..."
                      autoComplete="off"
                    />
                  </div>

                  <SelectTags
                    tags={this.state.tags}
                    onAddTag={this.handleAddTag}
                    selectedTags={this.state.selectedTags}
                    maxTags={this.state.maxTags}
                    onDeleteTag={this.handleDeleteTag}
                  />

                  <hr className="line-break" />
                  <div className="post-form post-form-content">
                    <TextareaAutosize
                      id="content-input"
                      type="text"
                      name="content"
                      placeholder="Content..."
                      autoComplete="off"
                    />
                  </div>
                </div>
                <Row id="form-publish-buttons">
                  <Col>
                    <button
                      onClick={this.publishBlog}
                      id="publish-button"
                      className="navbar-button-fill"
                    >
                      Publish
                    </button>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default withRouter(New);
