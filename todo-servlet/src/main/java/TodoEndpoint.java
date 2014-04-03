import at.irian.ankor.application.Application;
import at.irian.ankor.system.WebSocketServerEndpoint;
import org.apache.commons.lang.NotImplementedException;

@SuppressWarnings("unused")
public class TodoEndpoint extends WebSocketServerEndpoint {

    @Override
    protected Application createApplication() {
        // TODO
        throw new NotImplementedException();
    }

    @Override
    protected String getPath() {
        return "/websocket/ankor/{clientId}";
    }
}
