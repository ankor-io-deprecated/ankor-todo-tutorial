package io.ankor.tutorial;

import at.irian.ankor.action.Action;
import at.irian.ankor.annotation.ChangeListener;
import at.irian.ankor.fx.binding.fxref.FxRef;
import at.irian.ankor.fx.controller.FXControllerSupport;
import at.irian.ankor.ref.Ref;
import javafx.beans.property.Property;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.util.converter.NumberStringConverter;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

import static at.irian.ankor.fx.binding.fxref.FxRefs.refFactory;

public class TaskListController implements Initializable {

    private FxRef modelRef;

    @FXML
    public Node footerTop;
    @FXML
    public Node footerBottom;

    @FXML
    public Label todoCountNum;
    @FXML
    public Label todoCountText;

    @FXML
    public TextField newTodo;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        Ref rootRef = refFactory().ref("root");
        FXControllerSupport.init(this, rootRef);
        rootRef.fire(new Action("init"));
    }

    @ChangeListener(pattern = "root")
    public void myInit() {
        FxRef rootRef = App.refFactory().ref("root");
        modelRef = rootRef.appendPath("model");
        FxRef footerVisibilityRef = modelRef.appendPath("footerVisibility");

        Property<Boolean> footerVisibilityProperty = footerVisibilityRef.fxProperty();
        footerTop.visibleProperty().bind(footerVisibilityProperty);
        footerBottom.visibleProperty().bind(footerVisibilityProperty);

        todoCountText.textProperty().bind(modelRef.appendPath("itemsLeftText").<String>fxProperty());

        todoCountNum.textProperty().bindBidirectional(
                modelRef.appendPath("itemsLeft").<Number>fxProperty(),
                new NumberStringConverter());
    }

    @FXML
    public void newTodo(ActionEvent actionEvent) {
        String title = newTodo.getText();
        if (!title.equals("")) {
            Map<String, Object> params = new HashMap<>();
            params.put("title", title);
            modelRef.fire(new Action("newTask", params));
            newTodo.clear();
        }
    }

    @FXML
    public void toggleAll(ActionEvent actionEvent) {
        // TODO
    }

    @FXML
    public void clearTasks(ActionEvent actionEvent) {
        // TODO
    }

    @FXML
    public void filterAllClicked(ActionEvent actionEvent) {
        // TODO
    }

    @FXML
    public void filterActiveClicked(ActionEvent actionEvent) {
        // TODO
    }

    @FXML
    public void filterCompletedClicked(ActionEvent actionEvent) {
        // TODO
    }
}
