function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (!taskText) return;

  const li = createTaskItem(taskText, false);
  const pendingList = document.getElementById("pendingTasks");

  removeEmptyMessage(pendingList);
  pendingList.appendChild(li);
  input.value = "";
}

function createTaskItem(text, completed = false) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;

  if (completed) {
    const s = document.createElement("s");
    s.textContent = text;
    span.textContent = ''; 
    span.appendChild(s);
  }

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    const currentText = completed ? span.querySelector('s').textContent : span.textContent;
    const newText = prompt("Edit your task:", currentText);
    if (newText) {
      if (completed) {
        span.querySelector('s').textContent = newText;
      } else {
        span.textContent = newText;
      }
    }
  };

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = () => {
    const parentList = li.parentElement;
    li.remove();
    checkEmptyList(parentList);
  };

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = completed ? "Undo" : "Done";
  toggleBtn.onclick = () => toggleTaskStatus(li, completed);

  actions.append(editBtn, delBtn, toggleBtn);

  li.append(span, actions);
  return li;
}

function toggleTaskStatus(taskItem, wasCompleted) {
  const textElement = taskItem.querySelector("span");
  const text = wasCompleted ? textElement.querySelector('s').textContent : textElement.textContent;

  const targetList = document.getElementById(
    wasCompleted ? "pendingTasks" : "completedTasks"
  );
  const currentList = taskItem.parentElement;

  const newTask = createTaskItem(text, !wasCompleted);
  removeEmptyMessage(targetList);
  targetList.appendChild(newTask);

  taskItem.remove();
  checkEmptyList(currentList);
}

function removeEmptyMessage(list) {
  const emptyItem = list.querySelector(".empty");
  if (emptyItem) emptyItem.remove();
}

function checkEmptyList(list) {
  if (list.children.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.innerHTML =
      list.id === "completedTasks"
        ? "<s>No completed tasks yet.</s>"
        : "No pending tasks.";
    list.appendChild(empty);
  }
}
