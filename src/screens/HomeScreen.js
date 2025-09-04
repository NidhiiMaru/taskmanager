// src/screens/HomeScreen.js
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { useTasks } from "../context/taskprovider"; // task context
import { ThemeContext } from "../context/themeprovider"; // theme context

export default function HomeScreen({ navigation }) {
  const { tasks, deleteTask } = useTasks(); // tasks from context
  const { isDark, colors, toggleTheme } = useContext(ThemeContext); // theme

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Filtered tasks based on search + status
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      filterStatus === "All" ? true : task.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Theme Toggle */}
      <View style={{ flexDirection: "row",justifyContent: "space-between"}}>
      
      <Text style={[styles.header, { color: colors.text }]}>My Tasks</Text>
      <TouchableOpacity
        style={[styles.themeToggle, { backgroundColor: colors.card }]}
        onPress={toggleTheme}
      >
        <Text style={{ color: colors.text }}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </Text>
      </TouchableOpacity>
</View>
      {/* Search Bar */}
      <TextInput
        style={[
          styles.searchBar,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.text,
          },
        ]}
        placeholder="Search tasks..."
        placeholderTextColor={colors.text + "99"}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Status Filter Buttons */}
      <View style={styles.filterContainer}>
        {["All", "Pending", "In Progress", "Completed"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterBtn,
              {
                backgroundColor:
                  filterStatus === status ? "blue" : colors.card,
              },
            ]}
            onPress={() => setFilterStatus(status)}
          >
            <Text
              style={{
                color: filterStatus === status ? "white" : colors.text,
                fontWeight: "bold",
              }}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.text }]}>
          No tasks found.
        </Text>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.taskItem, { backgroundColor: colors.card }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.taskTitle, { color: colors.text }]}>
                  {item.title}
                </Text>

                {/* Show description if available */}
                {item.description ? (
                  <Text
                    style={[styles.taskDescription, { color: colors.text }]}
                  >
                    {item.description}
                  </Text>
                ) : null}

                {item.dueDate && (
                  <Text
                    style={[
                      styles.taskDate,
                      { color: isDark ? "#90ee90" : "green" },
                    ]}
                  >
                    Due: {item.dueDate}
                  </Text>
                )}

                <Text
                  style={[
                    styles.taskStatus,
                    { color: isDark ? "#87cefa" : "blue" },
                  ]}
                >
                  Status: {item.status}
                </Text>
              </View>

              {/* Edit Button */}
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => navigation.navigate("EditTask", { task: item })}
              >
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() =>
                  Alert.alert(
                    "Delete Task",
                    "Are you sure you want to delete this task?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => deleteTask(item.id),
                      },
                    ]
                  )
                }
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* Add Task Floating Button */}
      <TouchableOpacity
        style={[styles.addBtn, { backgroundColor: "blue" }]}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>+ Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 ,  marginTop:2},
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  taskTitle: { fontSize: 18, fontWeight: "bold" },
  taskDescription: { fontSize: 14, marginTop: 2 },
  taskDate: { fontSize: 14 },
  taskStatus: { fontSize: 14 },
  editBtn: {
    backgroundColor: "blue",
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  deleteBtn: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
  },
  btnText: { color: "white", fontWeight: "bold" },
  addBtn: {
    position: "absolute",
    bottom: 40,
    right: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
  },
  themeToggle: {
    alignSelf: "flex-end",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
});
