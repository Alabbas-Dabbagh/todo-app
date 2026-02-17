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
  createdAt?: number;
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

    const now = Date.now();
    const newTask: Task = {
      id: now.toString(),
      title: title.trim(),
      completed: false,
      createdAt: now,
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const openCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - openCount;
  const completionRate =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>Meine Aufgaben</Text>
        <Text style={styles.subtitle}>
          {tasks.length === 0
            ? "Du bist aktuell auf dem Laufenden."
            : `${openCount} offene ${
                openCount === 1 ? "Aufgabe" : "Aufgaben"
              }`}
        </Text>
      </View>

      <View style={styles.card}>
        {tasks.length > 0 && (
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Insgesamt</Text>
              <Text style={styles.statValue}>{tasks.length}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Offen</Text>
              <Text style={styles.statValue}>{openCount}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Erledigt</Text>
              <Text style={styles.statValue}>{completedCount}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Quote</Text>
              <Text style={styles.statValue}>{completionRate}%</Text>
            </View>
          </View>
        )}

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Neue Aufgabe"
            placeholderTextColor="#6b7280"
            value={title}
            onChangeText={setTitle}
            returnKeyType="done"
            onSubmitEditing={addTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Hinzufügen</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={
            tasks.length === 0 ? styles.emptyListContainer : undefined
          }
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <TouchableOpacity
                style={styles.itemContent}
                onPress={() => toggleTask(item.id)}
              >
                <View
                  style={[
                    styles.statusIndicator,
                    item.completed && styles.statusIndicatorDone,
                  ]}
                />
                <Text
                  style={[styles.itemText, item.completed && styles.done]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                accessible
                accessibilityRole="button"
                accessibilityLabel={`Aufgabe "${item.title}" löschen`}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.deleteText}>Löschen</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: "#020617",
  },
  header: {
    marginBottom: 24,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#e5e7eb",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
  },
  card: {
    flex: 1,
    backgroundColor: "#020617",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#111827",
  },
  statLabel: {
    fontSize: 11,
    color: "#9ca3af",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#e5e7eb",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1f2937",
    color: "#e5e7eb",
  },
  addButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#022c22",
    fontWeight: "600",
  },
  list: {
    marginTop: 4,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 14,
    textAlign: "center",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#111827",
    marginBottom: 8,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusIndicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#4b5563",
    marginRight: 10,
  },
  statusIndicatorDone: {
    backgroundColor: "#22c55e",
    borderColor: "#22c55e",
  },
  itemText: {
    fontSize: 16,
    color: "#e5e7eb",
  },
  done: {
    textDecorationLine: "line-through",
    color: "#6b7280",
  },
  deleteText: {
    color: "#f97373",
    fontSize: 14,
    paddingLeft: 12,
  },
});
