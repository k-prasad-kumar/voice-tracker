export const formError = (title, status, priority, dueDate) => {
  const VALID_STATUS = ["To Do", "In Progress", "Done"];
  const VALID_PRIORITY = ["Low", "Medium", "High"];

  if (!title || title.trim() === "") {
    return { error: "Title is required", success: false };
  }

  if (status && !VALID_STATUS.includes(status)) {
    return { error: "Invalid status value", success: false };
  }

  if (priority && !VALID_PRIORITY.includes(priority)) {
    return { error: "Invalid priority value", success: false };
  }

  if (!dueDate) {
    return { error: "Due date is required", success: false };
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    return { error: "Invalid due date", success: false };
  }

  return { error: "Success", success: true };
};
