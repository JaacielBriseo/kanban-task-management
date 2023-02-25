import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { KanbanApp } from './KanbanApp';
import './index.css';
import { ThemeContextProvider } from './theme/ThemeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<ThemeContextProvider>
			{/* <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}> */}
				<Provider store={store}>
					<BrowserRouter>
						<KanbanApp />
					</BrowserRouter>
				</Provider>
			{/* </GoogleOAuthProvider> */}
		</ThemeContextProvider>
	</React.StrictMode>
);
