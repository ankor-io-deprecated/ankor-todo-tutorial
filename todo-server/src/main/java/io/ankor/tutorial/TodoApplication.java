package io.ankor.tutorial;

import at.irian.ankor.ref.Ref;
import at.irian.ankor.ref.RefContext;
import io.ankor.tutorial.model.TaskRepository;
import io.ankor.tutorial.viewmodel.ModelRoot;

import java.util.Collections;
import java.util.Map;
import java.util.Set;

public class TodoApplication implements at.irian.ankor.application.Application {

    @Override
    public String getName() {
        // tell Ankor the name of our application
        return "Todo Server Application";
    }

    @Override
    public Set<String> getKnownModelNames() {
        // our application supports exactly one model named 'root'
        return Collections.singleton("root");
    }

    @Override
    public boolean isStateless() {
        // This application has stateful server sessions
        return false;
    }

    @Override
    public Object lookupModel(String modelName, Map<String, Object> connectParameters) {
        // we do not support connecting different clients (or users) to the same model
        // therefore we just return null here - meaning: we did not find a proper already existing model
        return null;
    }

    /**
     * Simple in-memory repo, just for testing ...
     */
    private final TaskRepository taskRepository = new TaskRepository();

    @Override
    public Object createModel(String modelName, Map<String, Object> connectParameters, RefContext refContext) {
        // create a new instance of our model root
        Ref rootRef = refContext.refFactory().ref("root");
        return new ModelRoot(rootRef, taskRepository);
    }

    @Override
    public void releaseModel(String modelName, Object modelRoot) {
        // nothing to do here because our model instance did not allocate any resources
    }

    @Override
    public void shutdown() {
        // nothing to do here because our Application singleton did not allocate any resources
    }

}
