import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import {formatDate} from "../lib/utlis";

// step261: lets have a constant object that will have the corresponding icon for it from Ionicons, based on the category name next to it, thus here below.
const CATEGORY_ICONS = {
    "Food & Drinks": "fast-food",
    "Groceries": "cart",
    "Utilities": "sparkles",
    "Entertainment": "film",
    "Bills": "receipt",
    "Travel": "airplane",
    "Health": "heart",
    "Clothing": "shirt",
    "Other": "ellipsis-horizontal"
}

// step262: now lets create the function here , taking the props passed i.e. the "item" and the "onDelete" function, thus here below.
export const TransactionItem = ({ item, onDelete }) => {

    // step263: we now check if its income or not based on +ve value of amount, thus here below ; and if its -ve then its expense thus here below ; parseFloat() is used to convert the string to a number thus here below.
    const isIncome = parseFloat(item.amount) > 0;

    // step264: now lets get the iconName based on the category mentioned by user, thus here below.

    // step265: so it looks up for "item.category" in the CATEGORY_ICONS object, and if found, returns the corresponding icon name, else returns "pricetag-outline" as the default icon, thus here below.
    const iconName = CATEGORY_ICONS[item.category] || "pricetag-outline";

    return (

        // step266: just like "map" of react ; FlatList automatically handles keys if you provide keyExtractor, but adding key here ensures React can track each item uniquely during rendering ; so we add unique key for each item being rendering, thus here below.
        <View style={styles.transactionCard} key={item.id}>
            <TouchableOpacity style={styles.transactionContent}>
                <View style={styles.categoryIconContainer}>

                    {/* step267: so the icon to be displayed, its name comes from the above variable we had made based on the category ; and color comes based on if its an income, show in GREEN else RED , coming from COLORS.income and COLORS.expense, thus here below. */}
                    <Ionicons name={iconName} size={22} color={isIncome ? COLORS.income : COLORS.expense} />
                </View>
                <View style={styles.transactionLeft}>

                    {/* step268: on left side of each card, we show the title and category name, thus here below. */}
                    <Text style={styles.transactionTitle}>{item.title}</Text>
                    <Text style={styles.transactionCategory}>{item.category}</Text>
                </View>
                <View style={styles.transactionRight}>
                    {/* step269: on the right hand side, we show the color of text based on if its an income or expense, thus here below. */}
                    <Text
                        style={[styles.transactionAmount, {color: isIncome ? COLORS.income : COLORS.expense}]}
                    >
                        {/* step270: now based on if its income we put "+", else put "-" there ; and use Math.abs : so that : if its expense and is already in -ve , no need to have two -- there ; so keeping them as absolute value i..e converted to +ve heps there , and we based on isIncome or not , put the "+" or "-" sign accordingly there, thus here below. */}
                        {isIncome ? "+" : "-"}₹{Math.abs(parseFloat(item.amount)).toFixed(2)}
                    </Text>

                    {/* step271: then we show the create date of the transaction, thus here below ; and we show the date using the "formatDate" function created in "utlis.js" file earlier there, thus here below. */}
                    <Text style={styles.transactionDate}>{formatDate(item.created_at)}</Text>
                </View>
            </TouchableOpacity>

            {/* step272: now lets have a DELETE button here below. */}

            {/* step273: we call the "delete" function with the item id when the button is pressed thus here below ; and this onDelete function came as prop from idnex.js file where it eventually called the handleDelete function there, to delete the transaction, thus here below. */}

            {/* step274: see the next steps in index.jsx file now there. */}
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
                <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
            </TouchableOpacity>
        </View>
    )
}