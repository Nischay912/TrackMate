import { View, Text, Alert, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { API_URL } from '../../constants/api'
import { styles } from '../../assets/styles/create.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'

// step301: lets have an array of categories that we will be showing on the create page there , which users can select from when adding transactions, to prevent writing the categories by themselves there, thus here below.
const CATEGORIES = [
    {id: "food", name: "Food & Drinks", icon: "fast-food"},
    {id: "groceries", name: "Groceries", icon: "cart"},
    {id: "utilities", name: "Utilities", icon: "sparkles"},
    {id: "entertainment", name: "Entertainment", icon: "film"},
    {id: "bills", name: "Bills", icon: "receipt"},
    {id: "travel", name: "Travel", icon: "airplane"},
    {id: "health", name: "Health", icon: "heart"},
    {id: "clothing", name: "Clothing", icon: "shirt"},
    {id: "other", name: "Other", icon: "ellipsis-horizontal"},
]

const CreateScreen = () => {
    // step302: lets get the router first here below from react-navigation, which helps to navigate from one page to the other, thus here below.
    const router = useRouter();

    // step303: now lets get the currently authenticated user from useUser hook of clerk, thus here below.
    const {user} = useUser();

    // step306: now lets have some state to be used here, thus here below.
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    // step307: by default, we will keep it as an expense, here below.
    const [isExpense, setIsExpense] = useState(true);

    // step308: by default. the loading state will be false , because we are not loading anything right now, thus here below.
    const [isLoading, setIsLoading] = useState(false);

    // step309: now lets create a function to handle the creation of the transactions, thus here below.
    const handleCreate = async () => {
        // step310: if there is no title for the tranaction, we will show an alert pop-up there, thus here below.

        // step311: we use "trim" because it may happen that : If the user enters " " (spaces) as the title, title is not empty, but it’s just spaces ; title.trim() removes those spaces. So " ".trim() becomes "" (an empty string) ; so this ensures users cannot submit a title that’s only spaces in it there, thus here below.
        if(!title.trim()){
            return Alert.alert("Error", "Please enter a title for the transaction!");
        }

        // step312: now lets check if amount entered is not a number i.e. NaN OR amount entered is <=0 , then we can also show a pop-up there, thus here below ; because if user has seleceted EXPENSE , we will only convert the 100 to -100 ; user should not type the amount with "-", else it will appear like --100 in the UI and not look good, thus here below ; here : parseFloat(amount) → converts the input string to a number ; its needed to convert the string amount to number so that valid comparisons and all like NaN can be checked with numbers only and not strings, thus here below.
        if(!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0){
            Alert.alert("Error", "Please enter a valid amount!");
            return;
        }

        // step313: now lets check if user has selected a category or not there, thus here below.
        if(!selectedCategory){
            return Alert.alert("Error", "Please select a category!");
        }

        // step315: now we will set the loading state to true, thus here below ; because : we are going to create a transaction now here below ; so while creating the transaction i.e. when the create button is clicked there, we want loading spinner to be there, thus here below.
        setIsLoading(true);

        try{
            // step316: first we will format the amount entered by user, thus here below.

            // step317: if user has selecetd "expense" there ; we will convert the amount to first absolute i.e. positive using Math.abs and then put "-" infront of it to make it -ve , else if its income selected by user ; we will keep it positive only i.e. dont put - sign as Math.abs alreayd converts any number to its +ve form, so now then it will stay in its positive form only there, thus here below.
            const formattedAmount = isExpense ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount));

            // step318: now lets make a call to the API to create the transaction here below ; for which we will make a call to the API_URL again that we had made in the useTransactions.js file as well too there , so lets instead create a seperate file for it there.

            // step319: so see the next steps in api.js file now there. 

            // step322: now lets make a all to the API_URL thus here below for creating the transactions, thus here below.

            // step323: by default "fetch" sends a GET request, so we need to explicitly mention the method to "POST" thus here below.
            const response = await fetch(`${API_URL}/transactions`, {
                method: "POST",

                // step324: now headers refers to extra info sent along with the request ; so the below header tells the server that the request body is in JSON format, thus here below.
                headers: {
                    "Content-Type": "application/json"
                },

                // step325: now since the backend route wanted title, amount, category and user_id in the request from req.body ; so lets send it here below in "body" ; JSON.stringify() converts the JavaScript object into a JSON string, which is the format the server expects ; and then we send the object with the fields the backend route wanted.

                // step326: we sent it as an object because : we had in backend also it accepted it as {....} = req.body ; so it must be an object sent there, from which it destructures whatever it wants there using the "key" names in the object sent from here, thus there/here below.

                // step327: In short: This code sends a POST request to your backend to create a new transaction with the specified user, title, amount, and category. The server will receive it as JSON and can save it to the database.
                body: JSON.stringify({
                    // ENSURE THAT ALL THE KEY NAMES ON LEFT OF ":" MATCH EXACT SAME AS IN THE ROUTE FILE IN BACKEND , LIKE THERE IT WAS USER_ID SO KEEP THAT ONLY HERE BELOW ; KEEPING IT USERID MAY CRASH THE APP AND IT MAY NOT WORK, THUS HERE BELOW.

                    // ALSO, WE ARE SENDING TO BACKEND THE USER ID COMING FROM CLERK AS "user" IS COMING FROM USEUSER HOOK OF CLERK, SO WE ARE GIVING THE IDS TO SIGNED IN USER FROM CLERK NOW TO SAVE TO THE DATABASE NOW, THUS EHRE BELOW ; SO NOW NO NEED TO CONSOLE LOG THAT USER ID LIKE WE DID EARLIER AND NO NEED TO MAUALLY PUT CLERK'S USER ID IN DATABASE LIKE WE DID EARLIER, BUT NOW THIS WILL AUTOMATICALLY DO THAT FOR US AND SAVE WITH THE CLERK'S USER ID IN THE DATABASE, THUS HERE BELOW.
                    user_id: user.id,
                    title,
                    amount: formattedAmount,
                    category: selectedCategory,
                }),
            })

            // step328: now lets check if response is not ok i.e. some error occured then we can do the following, thus here below.

            // step329: response is the object returned by fetch() ; response.ok is a boolean value ; !response.ok means the request failed with status code outside 200–299 (error, e.g., 400, 404, 500) ; else the request was successful with status code between 200–299 (success) ; thus here below.
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create transaction");
            }

            // step330: else if its "ok", we show the alert popup, here below.
            Alert.alert("Success", "Transaction created successfully!");

            // step331: and then we take the user back to the homepage usng router.back() as this makes the user to go back to the previous screen from it came, since "create" screen came from "home" screen, so it will take us back to the "home" screen, thus here below.
            router.back();
        }
        catch(error){
            // step332: in case of any error, we can console log it and show an alert popup also there, thus here below.
            console.log("Error creating transaction:", error);
            Alert.alert("Error", error.message || "Failed to create transaction");
        }
        finally{
            // step314: now whether the creation was successful or not, we will still set the loading state ack to false finally ; so that the loading spinner not keeps appearing there, thus here below.
            setIsLoading(false);
        }
    }

    // step333: now lets build the UI of the page, thus here below.
    return (
        <View style={styles.container}>
            {/* step334: lets make the header part first for the create page / create screen, thus here below. */}
            <View style={styles.header}>

                {/* step335: we can have an arrow button on top there, that takes us back to the home screen, because : the create screen came from the home screen and router.back() takes us back to the screen from which we came from, so : this will take us back to the home screen from which we came to this create screen by clicking "Add" on home screen earlier there, so this router.back() will take us back to the home screen again , hence so now we can have an arrow button on top there, that takes us back to the home screen, thus here below. */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name='arrow-back' size={24} color={COLORS.text} />
                </TouchableOpacity>

                {/* step336: then we can show the headings there saying New Transaction, thus here below. */}
                <Text style={styles.headerTitle}>New Transaction</Text>

                {/* step337: nwo lets have a button to save the transaction, thus here below. */}
                <TouchableOpacity
                    // step338: so we now use an array of styles here below ; which means it will apply all the styles of the array, starting from left to right there ; here saveButtonContainer will always be applied ; but the saveButtonDisabled style will be applied only when the isLoading is true, thus here below.
                    style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]}

                    // step339: it calls the function we created to create a transaction, thus here below.
                    onPress={handleCreate}

                    // step340: then it makes disbaled button if loading state is true ; and false when loading state is false, thus here below ; so the button will be disabled when screen will be loading, thus here below.
                    disabled={isLoading}
                >

                    {/* step341: now when the loading is happeneing we will show "Saving..." else "Save" will be shown there, thus here below. */}
                    <Text style={styles.saveButton}>
                        {isLoading ? "Saving..." : "Save"}
                    </Text>

                    {/* step342: now if the loading is not happening we will show a checkmark icon, thus here below ; but if loading is happening we will not show the checkmark icon there, thus here below. */}
                    {!isLoading && <Ionicons name='checkmark' size={18} color={COLORS.primary} />}
                </TouchableOpacity>
            </View>

            {/* step343: now lets create the part below the header now, thus here below. */}
            <View style={styles.card}>

                {/* step344: now lets have the type selector here below ; i.e. either the transaction is "expense" or "income", thus here below. */}
                <View style={styles.typeSelector}>

                    {/* step345: first lets put the expense selector as a button OR touchable opacity, thus here below. */}
                    <TouchableOpacity

                        // step346: so : we have an array of styles,which means we will be having all the styles of array applied together from left to right in the array thus here below ; now this typeButton style will be applied all the time but the 2nd one will be applied only if isExpense is true, thus here below.
                        style={[styles.typeButton, isExpense && styles.typeButtonActive]}

                        // step347: on pressing the button, we make isExpense true thus here below.
                        onPress={() => setIsExpense(true)}
                    >
                        <Ionicons
                            name='arrow-down-circle'
                            size={22}
                            // step348: based on whether this button is active or not show the colors of icon thus here below.
                            color={isExpense ? COLORS.white : COLORS.expense}
                            style={styles.typeIcon}
                        />

                        {/* step349: similarly, based on whether the button is active or not show the text styles thus here below ; again its an array of styles,which means we will be having all the styles of array applied together from left to right in the array thus here below ; but the typeButtontext will be applied all the time , whereas the typeButtonTextActive will be applied only if isExpense is true, thus here below. */}
                        <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>
                            Expense
                        </Text>
                    </TouchableOpacity>

                    {/* step350: similarly with similar or same classes just change of colors, lets put the button for income, thus here below. */}
                    <TouchableOpacity
                        style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
                        onPress={() => setIsExpense(false)}
                    >
                        <Ionicons
                            name='arrow-up-circle'
                            size={22}
                            color={!isExpense ? COLORS.white : COLORS.income}
                            style={styles.typeIcon}
                        />
                        <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
                            Income
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* step351: now lets have the input fields for amount, thus here below. */}
                <View style={styles.amountContainer}>
                    <Text style={styles.currencySymbol}>₹</Text>
                    <TextInput
                        style={styles.amountInput}
                        placeholder='0.00'
                        placeholderTextColor={COLORS.textLight}

                        // step352: the text written inside the input tag will be the value for the amount state, thus here below.
                        value={amount}

                        // step353: whenever the user types something ; the setAmount function updates the "amount" state with that new value, thus here below.
                        onChangeText={setAmount}

                        // step354: the keyboard will only have numbers by the following line of code, thus here below.
                        keyboardType='numeric'
                    />
                </View>

                {/* step355: now lets have the input tag for the title of the transaction, thus here below. */}
                <View style={styles.inputContainer}>
                    <Ionicons
                        name='create-outline'
                        size={22}
                        color={COLORS.textLight}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter title for the transaction'
                        placeholderTextColor={COLORS.textLight}

                        // step356: here also we will have that the text written inside the input tag will be the value for the title state, thus here below.
                        value={title}

                        // step357: whenever the user types something ; the setTitle function updates the "title" state with that new value, thus here below.
                        onChangeText={setTitle}
                    />
                </View>
                
                {/* step358: now lets put the heading text there for the category, thus here below. */}
                <Text style={styles.sectionTitle}>

                    {/* step359: put some space after /> so that the text has some spacing from the icon and is not looking sticked to it, thus here below. */}
                    <Ionicons name='pricetag-outline' size={16} color={COLORS.text} /> Select Category
                </Text>

                <View style={styles.categoryGrid}>

                {/* step360: now lets map through the category and show each of them in some styles in the UI, thus here below. */}
                    {CATEGORIES.map((category) => (
                        // step361: for each category in that array, we will render the following button or TouchableOpacity, thus here below.
                        <TouchableOpacity

                        // step362: by rule : "map" tells to have a unique key for every item it renders from the array, so lets have the id from the categories array we made as the unique key, thus here below.
                            key={category.id}

                            // step363: again now we have an array of styles, so : the styles.categoryButton will be applied all the time, whereas the styles.categoryButtonActive will be applied only if the selectedCategory is equal to the name of the category i.e. only if that category's name is in the selectedCategory state, then we will apply that active style to that button in the grid from all only to that active button there, thus here below.
                            style={[
                                styles.categoryButton,
                                selectedCategory === category.name && styles.categoryButtonActive,
                            ]}

                            // step364: now on pressing any button there ; its name will eb the value of the selectedCategory state and so the active color style will get applied to it, as per last step363, thus here below.
                            onPress={() => setSelectedCategory(category.name)}
                        >
                            <Ionicons
                                // step365: based on the name from categories array, we will show the corresponding ion-icon for each button in the grid there, thus here below.
                                name={category.icon}
                                size={20}

                                // step366: we will show the color of icon as "COLORS.white" if that button is active i.e. if that button's category is the current value of the selectedCategory state there , else the color will be "COLORS.text", thus here below.
                                color={selectedCategory === category.name ? COLORS.white : COLORS.text}
                                style={styles.categoryIcon}
                            />
                            
                            {/* step367: now lets have the text for each category button in the grid there, thus here below. */}
                            <Text
                                // step368: so again : we have an array of styles, so : the text will be applied by categoryButtonText always to all there ; but the categoryButtonTextActive will be applied only if the selectedCategory is equal to the name of the category i.e. only if that category's name is in the selectedCategory state i.e. only if the button is active there i.e. if the button has been selected there, making its category to come as the value of the selectedCategory state there, then we will apply that active style to that text in the grid from all only to that active button there, thus here below.
                                style={[
                                    styles.categoryButtonText,
                                    selectedCategory === category.name && styles.categoryButtonTextActive,
                                ]}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* step369: now lets show the activity indicator i.e. the loading spinner coming from react-native if its in the loading state i.e. if the isLoading state is true, thus here below. */}

            {/* step370: can see how it will look by making {true ...} here below instead of {isLoading ...}, thus here below. */}

            {/* step371: see the next steps in _layout.jsx file which is in root directory of "app" folder & not the one inside (root) folder, thus here below. */}
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' color={COLORS.primary} />
                </View>
            )}
        </View>
    )
}


export default CreateScreen