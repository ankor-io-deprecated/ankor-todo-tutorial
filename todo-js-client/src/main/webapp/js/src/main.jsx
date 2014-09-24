/**
 * @jsx React.DOM
 */
define([
  "ankor/AnkorSystem",
  "ankor/transport/WebSocketTransport",
  "ankor/utils/BaseUtils",
  "react"
], function (AnkorSystem, WebSocketTransport, BaseUtils, React) {
  
  var ankorSystem = new AnkorSystem({
    modelId: "root",
    transport: new WebSocketTransport("/websocket/ankor", {
      "connectProperty": "root"
    }),
    utils: new BaseUtils()
  });

  var rootRef = ankorSystem.getRef("root");

  rootRef.addTreeChangeListener(render);

  function render() {
    // TODO
  }
});
