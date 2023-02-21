export interface AuthSliceValues {
	status: 'checking' | 'authenticated' | 'not-authenticated';
	uid: null | string;
	email: null | string;
	displayName: null | string;
	photoURL: null | string;
	errorMessage: string | undefined | null;
}
export interface KanbanSliceInitialValues {
	boards: Board[];
	selectedBoardId: string | null;
	selectedColumnId: string | null;
	selectedTaskId: string | null;
	selectedSubtaskId: string | null;
}

export interface Board {
	boardId: string;
	name: string;
	columns: Column[];
}

export interface Column {
	columnId: string;
	name: string;
	tasks: Task[];
}

export interface Task {
	taskId: string;
	title: string;
	description: string;
	status: string;
	statusId: string;
	subtasks: Subtask[];
}

export interface Subtask {
	title: string;
	isCompleted: boolean;
	subtaskId: string;
}

/**
 * Kanban Slice Payloads
 */

export interface SetSelectedColumnAndTaskIdPayload {
	payload: { columnId: string; taskId: string };
}
export interface ToggleIsSubtaskCompletedPayLoad {
	 subtaskId:string 
}
export interface ChangeTaskColumnAndStatusPayload {
	payload: { newStatus: string; taskId: string; columnName: string; boardId: string; columnId: string };
}
export interface AddNewTaskPayload {
	payload: { newTask: Task; boardId: string; columnName: string };
}
export interface DeleteTaskPayload {
	payload: { taskId: string; boardId: string; columnId: string };
}

/*
AuthSlice Payloads
*/
export interface LoginPayload {
	payload: { uid: string; email: string; displayName: string; photoURL: string };
}
