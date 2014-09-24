/**
 * @jsx React.DOM
 */
define([
  "react",
  "build/filter"
], function (React, FILTER) {
  return React.createClass({
    render: function () {

      var model = this.props.model;

      var clearButton;
      if (model.clearButtonVisibility) {
        clearButton =
          React.DOM.button(
          {id:"clear-completed",
          onClick:this.props.onClearCompleted}, 
        model.itemsCompleteText
          )
      }

      var cx = React.addons.classSet;
      var filter = model.filter;
      var filterAll = cx({selected: filter === FILTER.ALL});
      var filterActive = cx({selected: filter === FILTER.ACTIVE});
      var filterCompleted = cx({selected: filter === FILTER.COMPLETED});

      return (
        React.DOM.footer( {id:"footer"}, 
          React.DOM.span( {id:"todo-count"}, 
            React.DOM.strong(null, model.itemsLeft), " ", model.itemsLeftText
          ),
          React.DOM.ul( {id:"filters"}, 
            React.DOM.li(null, 
              React.DOM.a( {href:"#/", className:filterAll}, "All")
            ),
            ' ',
            React.DOM.li(null, 
              React.DOM.a( {href:"#/active", className:filterActive}, "Active")
            ),
            ' ',
            React.DOM.li(null, 
              React.DOM.a( {href:"#/completed", className:filterCompleted}, "Completed")
            )
          ),
          clearButton
        ));
    }
  });
});