import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { KanbanApp } from './KanbanApp';
import './index.css';
import { ThemeContextProvider } from './theme/ThemeContext';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	//TODO: REMOVE STRICT MODE WHEN USING DND
	<React.StrictMode>
		<ThemeContextProvider>
			<Provider store={store}>
				<BrowserRouter>
					<KanbanApp />
				</BrowserRouter>
			</Provider>
		</ThemeContextProvider>
	</React.StrictMode>
);
