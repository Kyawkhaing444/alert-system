import { AlertManager } from './Components/AlertManager';
import { AlertsExample } from './Components/AlertsExample';

function App() {
    return (
        <div className="App">
            <AlertManager>
                <AlertsExample />
            </AlertManager>
        </div>
    );
}

export default App;
