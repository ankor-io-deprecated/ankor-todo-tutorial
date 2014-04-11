import at.irian.ankor.application.Application;
import at.irian.ankor.system.WebSocketServerEndpoint;
import io.ankor.tutorial.TodoApplication;

public class TodoEndpoint extends WebSocketServerEndpoint {

    @Override
    protected Application createApplication() {
        return new TodoApplication();
    }

    @Override
    protected String getPath() {
        return "/websocket/ankor/{clientId}";
    }
}