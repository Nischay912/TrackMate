import { useCallback, useState } from "react";
import {Alert} from "react-native";
import { API_URL } from "../constants/api";

// step192: now lets create a function that can be exported and used in other files if needed, thus here below.

// step193: it will take the userId as a parameter thus here below.
export const useTransactions = (userId) => {

    // step198: now lets have a variable directly here, so that we don't have to type this out again and again thus here below.
    // const API_URL = "http://localhost:5001/api";
    // const API_URL = "https://trackmate-api-do1y.onrender.com/api";

    // step194: now lets have the different states that will be used, thus here below.

    // step195: this will initially be an empty array , once we fetch the transactions from the database it will be populated thus here below.
    const [transactions, setTransactions] = useState([]);

    // step196: now we will also have a state to track the summary of the expenses thus here below.
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expenses: 0,
    });

    // step197: now lets have a loading state thus here below ; which will be "true" by default ; and once the transactions are fetched it will be set to "false" thus here below.
    const [isLoading, setIsLoading] = useState(true);

    // step198: now lets have the function to get all the transactions, thus here below.

    // step199: useCallback is used to prevent unnecessary re-renders ; it remembers the function you created so React doesn’t recreate it on every render ; It only recreates the function if the dependencies change ; thus : it helps in Performance optimization – avoids unnecessary re-creation of functions, thus here below.
    const fetchTransactions = useCallback(async () => {
        try{
            // step200: now lets get the response from the below URL thus here below.
            const response = await fetch(`${API_URL}/transactions/${userId}`)

            // step201: now lets convert the raw response to JSON format, thus here below ; await ensures we get the parsed data before continuing, thus here below.
            const data = await response.json();

            // step202: and then we update the transactions state thus here below with the data fetched thus here below.
            setTransactions(data);
        }
        catch(error){
            console.log("Error fetching transactions:", error);
        }
    // step203: so : this function will only re-run if the userId changes thus here below ; useCallback will recreate fetchTransactions only if userId changes and thus prevent unnecessary re-renders thus here below ; This is important if you want to re-fetch data automatically when the user changes, thus here below.
    }, [userId]);

    // step204: now similarly lets have a function to get the summary of the transactions thus here below.
    const fetchSummary = useCallback(async () => {
        try{
            // step205: now lets get the response from the below URL thus here below.
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`)
            const data = await response.json();

            // step206: and then we update the summary state thus here below with the data fetched thus here below.
            setSummary(data);
        }
        catch(error){
            console.log("Error fetching summary:", error);
        }
    }, [userId]);

    // step207: now lets have a function to call both the above functions at the same time thus showing both the transactions and the summary togethere there, thus here below.
    const loadData = useCallback(async () => {
        // step208: if there is no userId then return thus here below.
        if(!userId) return;

        // step209: we first set the loading state to "true", so that : the user knows that the data is being fetched , thus here below.
        setIsLoading(true);

        try{
        // step210: then now lets call both the functions together using Promise.all ; which helps to run both the functions in parallel , parallely together : so that the user doesn't have to wait for one to finish before the other starts, thus here below.

        /* step211: if we do -
            await fetchTransactions();
            await fetchSummary();

            ; then we will first be waiting till fetchTransactions finishes, then only fetchSummary will start, thus here below.

            But using Promise.all will run both of them in parallel : so it doesn't matter now which one finishes first ; no function will wait for the other ; whoever finishes first will render first and followed by the other one, thus here below.
            
            So, no function will wait for the other one to finish now, but run independently and can begin even when one is running too ; overall when both finishes then this line will get over and move ahead after this "await", thus here below.*/

            //step212: so : React waits for both to finish before moving on ; React waits for both to finish before moving on ; thus : its more efficient than awaiting one by one because it runs tasks concurrently ; thus Ensures you have all required data before continuing ; thus here, transactions and summary will be available together after both fetches finish, thus here below.

            await Promise.all([fetchTransactions(), fetchSummary()]);
        }
        catch(error){
            console.log("Error loading data:", error);
        }

        // step213: finally after all this, even if error comes or not, we set the loading state to "false" thus here below as we are done with fetching the data thus here below.

        // step214: its because by rule, this finally block will run even if error comes or not, thus here below.
        finally{
            setIsLoading(false);
        }
    }
    , [fetchSummary, fetchTransactions, userId]);

    // step215: now lets make a function to delete atransaction using its transaction id, thus here below.

    // step216: this will not depend on anything like above ones, thats why we don't use useCallback here, thus here below ; useCallback memoizes a function so that it keeps the same reference across renders unless its dependencies change ; Each render creates a new deleteTransaction, but you are calling it directly ; so unlike others where it had children components too, so re-rendering everytime will re-render whole children and all wrapped in it too there ; so to prevent he UI to reload everytime there , we used callback above ; but here : deleting is done directly on pressing button as per the backend code there, so it wont rr-render anything there, but delete the transaction of that id only, thus here below ; thats why we didn't use useCallback here, thus here below.

    const deleteTransaction = async(id) => {
        try{
            // step217: we send a request using "fetch" to the below URL and since we are using "fetch" so to make it like a call to delete something, we need to explicitly set the method to "DELETE" ; thus here below.
            const response = await fetch(`${API_URL}/transactions/${id}`, {
                method: "DELETE"
            });

            // step218: we check if the response is ok or not thus here below ; if error is there, we throw it, which gets caught by the catch block below, thus here below.
            if(!response.ok) throw new Error("Failed to delete transaction");

            // step219: if no error, we reload the data thus here below l so that it will call the loadData method above again to re-render everything with th eupdated transactions thus here below.
            loadData();

            // step220: show alert popup with the following title and description then now, thus here below.
            Alert.alert("Success", "Transaction deleted successfully!");
        }
        catch(error){
            console.log("Error deleting transaction:", error);
            Alert.alert("Error", "Failed to delete transaction");
        }
    }

    // step221: now lets return all these states and functions inside an object thus here below.

    // step222: we didn't return the "fetchTransactions" or "fetchSummary" functions here, because they are being called inside the "loadData" function above, so importing that is enough as it will eventually call both of them too, thus here below.

    // step223: now we can import this function in other files and access these using like : const {transactions, summary, isLoading, loadData, deleteTransaction} = useTransactions(userId); to destructure whatever we want out of these being returned by this function, thus here below.

    // step224: see the next steps in index.jsx file now there.
    return{
        transactions,
        summary,
        isLoading,
        loadData,
        deleteTransaction
    }
}