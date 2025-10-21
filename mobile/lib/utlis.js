// step124: now lets have this utility function that will halp us to fomrat the date thus here below.

function formatDate(dateString){
    // step125: so if we have a date of format : 2025-10-21 -> we will convert this to : October 21, 2025

    // step126: so first lets get the dateString converted to a Date object thus here below ; new Date will convert the dateString into a Date object thus here below : JavaScript cannot format a plain string into "21 October 2025" by itself ; Methods like .toLocaleDateString() only work on a Date object, not a string ; So we had to convert the string into a Date first here below.
    // const date = new Date(dateString);

    // step127: .toLocaleDateString() converts the Date object into a human-readable string based on locale and formatting options ; "en-US" means the output will follow US English locale rules ; the options object that specifies what parts of the date to include and how to display them.

    // step128: so it displays month as long name (e.g., "October"), day as numeric (e.g., "21"), and year as numeric (e.g., "2025") ; so if example : we have formatDate("2025-10-21") ; it will return "October 21, 2025".
    // return date.toLocaleDateString("en-US", {
    //     month: "long",
    //     day: "numeric",
    //     year: "numeric",
    // });

    // step129: to get in British format we can use "en-GB" ; so if example : we have formatDate("2025-10-21") ; it will return "21 October 2025"
    // return date.toLocaleDateString("en-GB", {
    //     month: "long",
    //     day: "numeric",
    //     year: "numeric",
    // });

    // step129: if we have a timestamp format like : "2025-10-21 14:07:17.099029" then : it will return "21 October 2025, 14:07" ; so for that we have the code here below.

    // step130: const timestamp = "2025-10-21 14:07:17.099029"; JavaScript cannot extract day, month, year, or format it directly from a string ; toLocaleDateString is not a function on strings ; so we convert it to Date object here below.

    // step131: .replace(" ", "T") makes it a valid ISO string ; because initially : it was a string of format : "2025-10-21 14:07:17.099029" ; but valid ISO (International Organization for Standardization) has a "T" instead of space in between the date and time ; so we replace the space with "T" ; now it is a valid ISO string thus here below and then we apply the .toLocaleDateString() method, thus here below.
    const date = new Date(dateString.replace(" ", "T"));

    // step132: Use toLocaleDateString() if you only want the date. Use toLocaleString() if you want both date and time.
    return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",

        // step133: can add the below lines to show time there as well.

        // step134: see the next steps in step135.txt file now there.

        // hour: "2-digit",
        // minute: "2-digit",
        // hour12: true  // <-- This enables AM/PM ; if not written it gives in 24-hour format there.
    });

}