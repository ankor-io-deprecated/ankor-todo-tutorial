/**
 * @jsx React.DOM
 */
define([
  "react",
  "build/keys"
], function (React, KEYS) {
  return React.createClass({
    setEditing: function (value) {
      this.props.modelRef.appendPath("editing").setValue(value);
    },

    handleKeyDown: function (event) {
      var ref = this.props.modelRef.appendPath("editing");
      if (event.which === KEYS.ESCAPE_KEY || event.which === KEYS.ENTER_KEY) {
        ref.setValue(false);
      }
    },

    handleChange: function (event) {
      this.props.modelRef.appendPath("title").setValue(event.target.value);
    },

    onToggle: function () {
      var ref = this.props.modelRef.appendPath("completed");
      ref.setValue(!this.props.model.completed);
    },
    
    render: function () {
      var model = this.props.model;

      var classes = React.addons.classSet({
        'completed': this.props.model.completed,
        'editing': this.props.model.editing
      });

      return (
        <li className={classes}>
          <div className="view">
            <input
            className = "toggle"
            type = "checkbox"
            checked = {model.completed}
            onChange = {this.onToggle}
            />
            <label onDoubleClick={this.setEditing.bind(this, true)}>
          {model.title}
            </label>
            <button
            className = "destroy"
            onClick = {this.props.onDestroy}
            />
          </div>
          <input
          ref = "editField"
          className = "edit"
          value = {model.title}
          onBlur = {this.setEditing.bind(this, false)}
          onChange = {this.handleChange}
          onKeyDown = {this.handleKeyDown}
          />
        </li>);
    }
  });
});