// src/screens/AddTaskScreen.js
import React, { useState ,useContext} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTasks } from "../context/taskprovider";
import { ThemeContext } from "../context/themeprovider";
import { scheduleTaskNotification } from "../utils/notifications";

export default function AddTask({ navigation }) {
  const { addTask } = useTasks();
const { colors } = useContext(ThemeContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const newTask = addTask({
      title,
      description,
      dueDate: dueDate ? dueDate.toDateString() : null,
      status: "Pending", // default
    });

    //  schedule local notification after adding task
    await scheduleTaskNotification(newTask);

    navigation.goBack(); // return to HomeScreen
  };
    addTask({
      title,
      description,
      dueDate: dueDate ? dueDate.toDateString() : null,
      status: "Pending", // default
    });

    navigation.goBack(); // return to HomeScreen
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Add New Task</Text>

      {/* Title */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        placeholder="Task Title"
        placeholderTextColor={colors.text + "99"}
        value={title}
        onChangeText={setTitle}
      />

      {/* Description */}
      <TextInput
        style={[
          styles.input,
          styles.multilineInput,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        placeholder="Task Description"
        placeholderTextColor={colors.text + "99"}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Due Date */}
      <TouchableOpacity
        style={[styles.dateBtn, { backgroundColor: "plum" }]}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateBtnText}>
          {dueDate ? `Due: ${dueDate.toDateString()}` : "Pick Due Date"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDueDate(selectedDate);
          }}
        />
      )}

      {/* Save Button */}
      <Button title="Save Task" onPress={handleSave} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  multilineInput: { height: 50, textAlignVertical: "top" },
  dateBtn: {
    padding: 9,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  dateBtnText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
