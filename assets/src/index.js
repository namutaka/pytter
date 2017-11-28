import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import App from './containers/App';
import configureStore from './store'
import registerServiceWorker from './utils/registerServiceWorker';
import { IntlProvider, } from 'react-intl'
import {addLocaleData} from 'react-intl'
import ja from 'react-intl/locale-data/ja';
addLocaleData([...ja]);

injectTapEventPlugin();

const store = configureStore()
ReactDOM.render(
  <IntlProvider locale={navigator.language}>
    <Provider store={store}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>
  </IntlProvider>,
  document.getElementById('root'));

registerServiceWorker();

