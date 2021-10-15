import React, { useState } from "react";
import { Row, Col, Container, Form, Input, Label, FormGroup } from "reactstrap";
import "./css/settings.css";

function Settings(props) {
  const [profilePic, setProfilePic] = useState(props.user["picture"]);
  function updateUserInfo(event) {
    event.preventDefault();
    const username = event.target.form[0].value;
    const email = event.target.form[1].value;
    const profilePic = event.target.form[2].value;
  }

  function updatePicture(event) {
    console.log(event.target.form[2].files[0]);
    setProfilePic(event.target.form[2].value);
  }

  return (
    <Container>
      <Row>
        <Col />
        <Col md="8" lg="6">
          <div className="setting-container">
            <Form>
              <div className="settings-div rounded-div truncate-text">
                <div className="settings-title">User settings</div>
                <FormGroup>
                  <Label className="settings-label" for="username">
                    Username
                  </Label>
                  <Input
                    defaultValue={props.user["http://localhost:3000/username"]}
                    className="settings-input"
                    name="username"
                    id="username"
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="settings-label" type="email" for="email">
                    Email
                  </Label>
                  <Input
                    className="settings-input"
                    defaultValue={props.user["email"]}
                    name="email"
                    id="email"
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="settings-label d-block" for="profile-image">
                    Profile image
                  </Label>
                  <img
                    className="profile-picture-large margin-sm-right"
                    src={profilePic}
                    alt="Profile"
                  ></img>
                  <Input
                    onChange={(event) => {
                      updatePicture(event);
                    }}
                    multiple={false}
                    type="file"
                    name="profile-image"
                    id="profile-image"
                  />
                </FormGroup>
              </div>
              <Row id="form-publish-buttons">
                <Col>
                  <FormGroup>
                    <button
                      onClick={updateUserInfo}
                      id="publish-button"
                      className="navbar-button-fill"
                    >
                      Save
                    </button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Settings;
