import React from "react";
import { Input } from "reactstrap";

class SelectTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = { maxTags: false, selectedTags: new Set() };
  }

  returnTagOptions() {
    if (!this.props.tags) {
      return;
    }
    let tagOptions = [];
    this.props.tags.forEach((tag, idx) => {
      if (!this.props.selectedTags.has(tag.tag)) {
        tagOptions.push(<option key={tag.id}>{tag.tag}</option>);
      }
    });
    return tagOptions;
  }

  renderSelectedTags() {
    let selectedTagsText = [];
    this.props.selectedTags.forEach((tag, idx) => {
      selectedTagsText.push(
        <div
          className="tag"
          key={idx}
          onClick={() => {
            this.props.onDeleteTag(tag);
          }}
        >
          {"#" + tag}
        </div>
      );
    });
    return selectedTagsText;
  }

  render() {
    return (
      <div id="tag-select-div">
        <div id="select-div">
          <Input
            onChange={(event) => {
              this.props.onAddTag(event);
            }}
            type="select"
            name="select"
            id="tag-select-form"
          >
            <option value="DEFUALT">Select tags...</option>
            {this.returnTagOptions()}
          </Input>
          {this.props.maxTags ? (
            <div className="warning">Only select up to 4 tags</div>
          ) : (
            <div></div>
          )}
        </div>
        <div id="selected-tags">{this.renderSelectedTags()}</div>
      </div>
    );
  }
}

export default SelectTags;
