import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageNotFound } from "./";
import { Container, Row, Col } from "reactstrap";
import { Loading } from "./";

function BlogView() {
  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { username, blogUrl } = useParams();

  useEffect(() => {
    async function fetchBlogPost(username, blogUrl) {
      try {
        const path =
          process.env.REACT_APP_SERVER_DOMAIN +
          "/api/users/username/" +
          username +
          "/blogUrl/" +
          blogUrl;
        const response = await fetch(path);
        const blogData = await response.json();
        setBlogData(blogData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
    fetchBlogPost(username, blogUrl);
  }, [blogUrl, username]);

  function renderResult() {
    if (blogData == null) {
      return <PageNotFound />;
    }
    return showResult(blogData.title, blogData.content, blogData.tags);
  }

  function renderTags(tags) {
    let tagsArray = [];
    tags.forEach((tag, idx) => {
      tagsArray.push(
        <div key={idx} className="tag">
          <a className="no-style" href={"/?tag=" + tag.tag.tag}>
            {"#" + tag.tag.tag}
          </a>
        </div>
      );
    });
    return tagsArray;
  }

  function showResult(blogTitle, blogContent, tags) {
    return (
      <Container>
        <Row>
          <Col />
          <Col sm="12" md="10" lg="8">
            <div id="postFormDiv">
              <div id="post-content" className="rounded-div">
                <div className="post-form post-form-title">
                  <h1 id="title-input">{blogTitle}</h1>
                </div>
                <div id="tag-select-div">
                  <div id="selected-tags">{renderTags(tags)}</div>
                </div>
                <hr className="line-break" />
                <div className="post-form post-form-content">{blogContent}</div>
              </div>
            </div>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }

  return <div>{isLoading ? <Loading /> : renderResult()}</div>;
}

export default BlogView;
