package io.ankor.tutorial;

import at.irian.ankor.ref.RefContext;

import java.util.Map;
import java.util.Set;

/**
 * @author Manfred Geiler
 */
public class TodoApplication implements at.irian.ankor.application.Application {
    @Override
    public String getName() {
        return null;  //Todo
    }

    @Override
    public boolean isStateless() {
        return false; //Todo
    }

    @Override
    public Set<String> getKnownModelNames() {
        return null; //Todo
    }

    @Override
    public Object lookupModel(String modelName, Map<String, Object> connectParameters) {
        return null;  //Todo
    }

    @Override
    public Object createModel(String modelName, Map<String, Object> connectParameters, RefContext refContext) {
        return null;  //Todo
    }

    @Override
    public void releaseModel(String modelName, Object modelRoot) {
        //Todo
    }

    @Override
    public void shutdown() {
        //Todo
    }
}
