import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { KanbanApp } from './KanbanApp';
import { store } from './store';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<KanbanApp />
		</Provider>
	</React.StrictMode>
);
