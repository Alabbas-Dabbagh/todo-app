import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { DEFAULT_LIST_ID, TASK_LISTS } from "@/constants/task-lists";
import { IconSymbol } from "@/components/ui/icon-symbol";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: number;
  listId?: string;
};

const STORAGE_KEY = "todo_tasks_v1";

export default function ExploreScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Task[] = JSON.parse(raw);
        const withList = parsed.map((task) => ({
          ...task,
          listId: task.listId ?? DEFAULT_LIST_ID,
        }));
        setTasks(withList);
      } else {
        setTasks([]);
      }
    } catch (e) {
      console.log("Load error (explore):", e);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const open = total - completed;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const statsByList = TASK_LISTS.map((list) => {
    const listTasks = tasks.filter(
      (task) => (task.listId ?? DEFAULT_LIST_ID) === list.id
    );
    const listTotal = listTasks.length;
    const listCompleted = listTasks.filter((t) => t.completed).length;
    const listOpen = listTotal - listCompleted;
    const listRate =
      listTotal === 0 ? 0 : Math.round((listCompleted / listTotal) * 100);

    return {
      id: list.id,
      title: list.title,
      total: listTotal,
      open: listOpen,
      completed: listCompleted,
      rate: listRate,
    };
  });

  const tasksWithDate = [...tasks].sort((a, b) => {
    const aTime = a.createdAt ?? Number(a.id) ?? 0;
    const bTime = b.createdAt ?? Number(b.id) ?? 0;
    return bTime - aTime;
  });

  const formatDate = (millis: number | undefined) => {
    if (!millis || Number.isNaN(millis)) return "-";
    const date = new Date(millis);
    return `${date.toLocaleDateString("de-DE")} ${date.toLocaleTimeString(
      "de-DE",
      { hour: "2-digit", minute: "2-digit" }
    )}`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.appTitle}>Übersicht & Statistik</Text>
      <Text style={styles.subtitle}>
        Hier siehst du eine Zusammenfassung deiner Aufgabenliste.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Aktueller Status</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Insgesamt</Text>
            <Text style={styles.statValue}>{total}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Offen</Text>
            <Text style={styles.statValue}>{open}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Erledigt</Text>
            <Text style={styles.statValue}>{completed}</Text>
          </View>
        </View>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>Erledigungsquote</Text>
          <Text style={styles.progressValue}>{completionRate}%</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Listenübersicht</Text>
        {statsByList.map((list) => (
          <View key={list.id} style={styles.listRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.listTitleRow}>
                <IconSymbol
                  size={16}
                  name={
                    TASK_LISTS.find((l) => l.id === list.id)?.iconName ??
                    "list.bullet"
                  }
                  color="#9ca3af"
                />
                <Text style={styles.listTitle}>{list.title}</Text>
              </View>
              <Text style={styles.listMeta}>
                {list.total} gesamt · {list.open} offen · {list.completed} erledigt
              </Text>
            </View>
            <Text style={styles.listRate}>{list.rate}%</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Verlauf</Text>
        {tasksWithDate.length === 0 ? (
          <Text style={styles.emptyText}>
            Noch keine Aufgaben vorhanden. Lege zuerst Aufgaben im Tab
            „Meine Aufgaben“ an.
          </Text>
        ) : (
          tasksWithDate.map((task) => {
            const createdMillis = task.createdAt ?? Number(task.id) ?? 0;
            return (
              <View key={task.id} style={styles.historyRow}>
                <View style={styles.historyMain}>
                  <View
                    style={[
                      styles.statusIndicator,
                      task.completed && styles.statusIndicatorDone,
                    ]}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.historyTitle,
                        task.completed && styles.historyTitleDone,
                      ]}
                      numberOfLines={1}
                    >
                      {task.title}
                    </Text>
                    <Text style={styles.historyMeta}>
                      Angelegt: {formatDate(createdMillis)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.historyStatus}>
                  {task.completed ? "Erledigt" : "Offen"}
                </Text>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#e5e7eb",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#020617",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e7eb",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statBox: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#111827",
  },
  statLabel: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e5e7eb",
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: "#9ca3af",
  },
  progressValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#22c55e",
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 14,
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#111827",
  },
  historyMain: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  statusIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#4b5563",
    marginRight: 10,
  },
  statusIndicatorDone: {
    backgroundColor: "#22c55e",
    borderColor: "#22c55e",
  },
  historyTitle: {
    fontSize: 14,
    color: "#e5e7eb",
  },
  historyTitleDone: {
    textDecorationLine: "line-through",
    color: "#6b7280",
  },
  historyMeta: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  historyStatus: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9ca3af",
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#111827",
  },
  listTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  listTitle: {
    fontSize: 14,
    color: "#e5e7eb",
  },
  listMeta: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  listRate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#22c55e",
  },
});
