export const fetchTodoStatusColor = (dueDate, isTodoCompleted) => {
    const currentTime = new Date();
    const alarmTime = new Date(dueDate);
    let alarmStatusColor = "rgb(182, 120, 255)"; // Default color
    if (isTodoCompleted) {
        alarmStatusColor = "green";
    } else if (alarmTime < currentTime) {
        alarmStatusColor = "red";
    }
    return alarmStatusColor;
};
