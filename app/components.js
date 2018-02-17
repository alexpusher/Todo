const StorageKey = 'TodoApp';

export const TodoStorage = {
	// Return saved tasks
	getTasks(){
		return JSON.parse(localStorage.getItem(StorageKey)) || [];
	},
	/*
	* Save in storage tasks
	* @param {array} tasks Array with tasks
	*/
	saveTasks(tasks){
		if(tasks.length > 0){
			localStorage.setItem(StorageKey, JSON.stringify(tasks));
		}else{
			delete localStorage[StorageKey];
		}

	}
};
