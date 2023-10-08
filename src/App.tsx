import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import BarcodeProvider from './provider/BarcodeProvider';

setupIonicReact();

const App: React.FC = () => {
  return (
    <BarcodeProvider>
      <Provider store={store}>
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu/>
              <IonRouterOutlet id="main">
                <Route path="/" exact={true}>
                  <Redirect to="/folder/Inbox"/>
                </Route>
                <Route path="/folder/:name" exact={true}>
                  <Page/>
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      </Provider>
    </BarcodeProvider>
  );
};

export default App;