// step279:
import { Ionicons } from "@expo/vector-icons";
import {Text, View, TouchableOpacity} from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { useRouter } from "expo-router";

const NoTransactionsFound = () => {
    const router = useRouter();

    return (
        <View style={styles.emptyState}>
            <Ionicons
                name="receipt-outline"
                size={60}
                color={COLORS.textLight}
                style={styles.emptyStateIcon}
            />
            <Text style={styles.emptyStateTitle}>No transactions found</Text>
            <Text style={styles.emptyStateText}>
                Start tracking your expenses by adding your first transaction now
            </Text>

            {/* step279: after all the above icon and text ; now we can have a button here below that takes us to "/create" page using router from react-native ; and we have also placed some styles for that button, thus here below. */}

            {/* step280: see the next steps in index.jsx file now there. */}
            <TouchableOpacity style={styles.emptyStateButton} onPress={() => router.push("/create")}>
                <Ionicons name="add-circle" size={18} color={COLORS.white} />
                <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NoTransactionsFound