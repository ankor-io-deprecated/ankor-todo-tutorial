package io.ankor.tutorial;

import at.irian.ankor.ref.RefContext;

import java.util.Map;

/**
 * @author Manfred Geiler
 */
public class TodoApplication implements at.irian.ankor.application.Application {
    @Override
    public String getName() {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public boolean supportsModel(String modelName) {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Object lookupModel(String modelName, Map<String, Object> connectParameters) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Object createModel(String modelName, Map<String, Object> connectParameters, RefContext refContext) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void releaseModel(String modelName, Object modelRoot) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void shutdown() {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
