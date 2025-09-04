// src/screens/EditTaskScreen.js
import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTasks } from "../context/taskprovider";
import { ThemeContext } from "../context/themeprovider"; // 👈 import Theme
import { scheduleTaskNotification } from "../utils/notifications";

export default function EditTaskScreen({ route, navigation }) {
  const { updateTask } = useTasks();
  const { colors } = useContext(ThemeContext); // 👈 use theme
  const { task } = route.params;

  
  // Local state for form fields
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate) : null
  );
  const [showPicker, setShowPicker] = useState(false);

  // Handle save
  const onSave = async () => {  // add async
  const updatedTask = {
    ...task,
    title,
    description,
    status,
    dueDate: dueDate ? dueDate.toDateString() : null,
  };
updateTask(updatedTask);
// Schedule notification for edited task
  await scheduleTaskNotification(updatedTask);

  navigation.goBack();
};


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.label, { color: colors.text }]}>Edit Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={[
          styles.input,
          { borderColor: colors.card, color: colors.text },
        ]}
        placeholder="Enter title"
        placeholderTextColor={colors.text}
      />

      <Text style={[styles.label, { color: colors.text }]}>
        Edit Description
      </Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[
          styles.input,
          styles.multilineInput,
          { borderColor: colors.card, color: colors.text },
        ]}
        multiline
        placeholder="Enter description"
        placeholderTextColor={colors.text}
      />

      <Text style={[styles.label, { color: colors.text }]}>Status</Text>
      <View style={styles.statusContainer}>
        {["Pending", "In Progress", "Completed"].map((s) => {
          let bgColor = colors.card; // default background

          if (status === s) {
            if (s === "Pending") bgColor = "red";
            else if (s === "In Progress") bgColor = "orange";
            else if (s === "Completed") bgColor = "green";
          }

          return (
            <TouchableOpacity
              key={s}
              style={[styles.statusOption, { backgroundColor: bgColor }]}
              onPress={() => setStatus(s)}
            >
              <Text
                style={{
                  color: status === s ? "white" : colors.text,
                  fontWeight: "bold",
                }}
              >
                {s}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={[styles.label, { color: colors.text }]}>Due Date</Text>
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

      <Button title="Save Changes" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { marginBottom: 6, fontWeight: "bold", fontSize: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  multilineInput: { height: 50, textAlignVertical: "top" },

  // 🔹 Status Options
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statusOption: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },

  dateBtn: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 40,
    alignItems: "center",
    width: 200,
  },
  dateBtnText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
