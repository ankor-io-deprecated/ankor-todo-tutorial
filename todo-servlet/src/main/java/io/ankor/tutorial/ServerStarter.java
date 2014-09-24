package io.ankor.tutorial;

import at.irian.ankor.application.Application;
import at.irian.ankor.application.GenericApplication;
import at.irian.ankor.system.WebSocketSpringBootServer;
import io.ankor.tutorial.viewmodel.ModelRoot;
import org.springframework.boot.SpringApplication;

public class ServerStarter extends WebSocketSpringBootServer {

    @Override
    protected Application createApplication() {
        GenericApplication application = new GenericApplication();
        application.setName("Todo Sample");
        application.setDefaultModelType(ModelRoot.class);
        return application;
    }

    public static void main(String[] args) {
        SpringApplication.run(ServerStarter.class, args);
    }
}
