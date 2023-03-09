export interface User {
	name: string | null;
	nickname?: string;
	email: string | null;
	img: string | null;
	role: 'SUPER_ROLE' | 'USER_ROLE' | 'ADMIN_ROLE' | null;
	isActive: boolean | null;
	google: boolean | null;
	uid: string | null;
}

export interface AuthSliceValues {
	status: 'checking' | 'authenticated' | 'not-authenticated';
	user: User;
	errorMessage: string | undefined | null;
}

export interface KanbanSliceInitialValues {
	boards: Board[];
	selectedBoardId: string | null;
	selectedColumnId: string | null;
	selectedTaskId: string | null;
	selectedSubtaskId: string | null;
	fetchingBoards: boolean;
}

export interface Board {
	boardId: string;
	boardName: string;
	columns: Column[];
	members?: User[] | null;
	manager?: User;
}

export interface Column {
	columnId: string;
	columnName: string;
	tasks: Task[];
}

export interface Task {
	taskId: string;
	title: string;
	description: string;
	status: string;
	subtasks: Subtask[];
	parentColumnId: string;
	manager?: User;
	assignedTo?: User | null;
}

export interface Subtask {
	subtaskTitle: string;
	isCompleted: boolean;
	subtaskId: string;
}

export type ModalName =
	| null
	| 'AddNewBoard'
	| 'AddNewTask'
	| 'DeleteBoard'
	| 'DeleteTask'
	| 'EditBoard'
	| 'EditTask'
	| 'SelectBoard'
	| 'ViewTask'
	| 'AddMemberToBoard'
	| 'AccessToThirdPartyBoard'
	| 'SavingChanges';
