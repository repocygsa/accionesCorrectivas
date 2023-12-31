import ReactDOM from 'react-dom';

// third party
import {BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
// import { store } from 'store';

// style + assets
import 'assets/scss/style.scss';

import { QueryClient,QueryClientProvider } from 'react-query';


import {store,Persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { SocketProvider } from 'context/SocketContext';

// ==============================|| REACT DOM RENDER  ||============================== //
const queryClient =  new QueryClient()



ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={ null } persistor={ Persistor } >
        <QueryClientProvider client={queryClient}>
           <SocketProvider>       
               <BrowserRouter>
                 <App />          
                </BrowserRouter>
            </SocketProvider>
        </QueryClientProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
