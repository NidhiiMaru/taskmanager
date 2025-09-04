import * as Notifications from 'expo-notifications';

export async function scheduleTaskNotification(task) {
  if (!task.dueDate) return;

  const triggerDate = new Date(task.dueDate); // make sure it's a Date object

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Task Reminder",
      body: task.title,
      data: { taskId: task.id },
    },
    trigger: triggerDate,
  });
}
