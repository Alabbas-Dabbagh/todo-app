import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const STORAGE_KEY = "todo_tasks_v1";

export default function Index() {
  const [title, setTitle] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks on app start
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setTasks(JSON.parse(raw));
        }
      } catch (e) {
        console.log("Load error:", e);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTasks();
  }, []);

  // Save tasks after change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (e) {
        console.log("Save error:", e);
      }
    };

    if (isLoaded) saveTasks();
  }, [tasks]);

  const addTask = () => {
    if (!title.trim()) {
      Alert.alert("Hinweis", "Bitte eine Aufgabe eingeben.");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do Liste</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Neue Aufgabe..."
          value={title}
          onChangeText={setTitle}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={{ color: "#000000" }}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => toggleTask(item.id)}
            >
              <Text
                style={[
                  styles.itemText,
                  item.completed && styles.done,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={{ color: "red" }}>Löschen</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#ffffff", // weißer Hintergrund
  },
  
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
  },
  
  inputRow: { flexDirection: "row", marginBottom: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
    borderRadius: 6,
  },
  addButton: {
    paddingHorizontal: 12,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 6,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    color: "#000000",
  },
  
  done: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
});
