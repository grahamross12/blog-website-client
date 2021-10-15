import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Collapse,
  Form,
  Input,
  Button,
  Col,
} from "reactstrap";
import { LoginButton, CreateAccountButton, LogoutButton } from "./";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./css/navigation.css";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isMobile: false,
    };
    this.toggleIsOpen = () => this.setState({ isOpen: !this.state.isOpen });
  }

  componentDidMount = () => {
    this.checkMobile();
    window.addEventListener("resize", () => {
      this.checkMobile();
    });
  };

  checkMobile = () => {
    if (window.innerWidth < 768) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  renderNavButtons = () => {
    return (
      <React.Fragment>
        {this.state.isMobile ? <>{this.renderSearchbarExpander()}</> : <></>}

        {this.props.isAuthenticated ? (
          <div>
            <Col className="d-none d-md-block f-left">
              <a
                id="new-post-button"
                className="navbar-button-fill"
                href="/new"
              >
                Create Post
              </a>
            </Col>
            <div className="dropdown-div f-right">
              <div id="profile-picture-div">
                <img
                  id="profile-picture"
                  src={this.props.user.picture}
                  alt="Profile"
                ></img>
              </div>
              <div
                tabIndex="-1"
                role="menu"
                aria-hidden="true"
                className="dropdown-menu"
              >
                <a
                  href="/new"
                  type="button"
                  tabIndex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  Create Post
                </a>
                <a
                  href={
                    "http://localhost:3000/user/" +
                    this.props.user["http://localhost:3000/username"]
                  }
                  type="button"
                  tabIndex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  My Posts
                </a>

                <a
                  href="/settings"
                  type="button"
                  tabIndex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  Settings
                </a>
                <div tabIndex="-1" className="dropdown-divider"></div>
                <LogoutButton />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Col className="d-none d-md-block f-left">
              <LoginButton />
            </Col>
            <div className="f-right">
              <CreateAccountButton />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };

  renderSearchbar = (withMargin) => {
    let margin = "";
    if (withMargin) {
      margin = "with-margin";
    }
    return (
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <Form inline>
            <div id="search-div-nav" className={"search-dropdown " + margin}>
              <Input
                id="search"
                type="text"
                name="search"
                placeholder="Search..."
                autoComplete="off"
              />
              <Button id="search-icon" color="white">
                <FontAwesomeIcon color="black" icon={faSearch} />
              </Button>
            </div>
          </Form>
        </Nav>
        {/*Pull towards left */}

        {/* Pull towards right */}
      </Collapse>
    );
  };

  renderSearchbarExpander = () => {
    return (
      <Button id="search-icon-expander" onClick={this.toggleIsOpen}>
        <FontAwesomeIcon color="black" icon={faSearch} />
      </Button>
    );
  };

  render() {
    return (
      <Navbar color="light" light expand="md">
        <div className="container">
          <NavbarBrand href="/">Blog</NavbarBrand>
          {this.state.isMobile ? <></> : this.renderSearchbar(false)}
          {/* Below, we'll add toggler for auto-collapse */}

          <div id="accountDivNav">{this.renderNavButtons()}</div>
          {this.state.isMobile ? this.renderSearchbar(true) : <div />}
        </div>
      </Navbar>
    );
  }
}

export default Navigation;
