import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../pages';
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { setBoards, useAppDispatch, useAppSelector } from '../../store';
export const KanbanRoutes = () => {
	const { uid } = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();
	const fetchData = useCallback(async () => {
		await axios
			.get('http://localhost:4000/api/boards', {
				headers: { userId: uid },
			})
			.then(res => {
				dispatch(setBoards([...res.data]));
			})
			.catch(err => console.log(err));
	}, [dispatch, uid]);
	useEffect(() => {
		if (!uid) return;
		fetchData();
	}, [fetchData, uid]);
	return (
		<Routes>
			<Route path='/home' element={<Home />} />
			<Route path='/*' element={<Navigate to='/home' />} />
		</Routes>
	);
};
