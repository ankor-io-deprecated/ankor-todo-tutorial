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
        React.DOM.li( {className:classes}, 
          React.DOM.div( {className:"view"}, 
            React.DOM.input(
            {className:  "toggle",
            type:  "checkbox",
            checked:  model.completed,
            onChange:  this.onToggle}
            ),
            React.DOM.label( {onDoubleClick:this.setEditing.bind(this, true)}, 
          model.title
            ),
            React.DOM.button(
            {className:  "destroy",
            onClick:  this.props.onDestroy}
            )
          ),
          React.DOM.input(
          {ref:  "editField",
          className:  "edit",
          value:  model.title,
          onBlur:  this.setEditing.bind(this, false),
          onChange:  this.handleChange,
          onKeyDown:  this.handleKeyDown}
          )
        ));
    }
  });
});