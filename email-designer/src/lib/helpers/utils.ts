import { cleanHtmlData, htmlRegex, replaceHtmlRegex } from "../email-composer/constants";

// handlePaste function to process the clipboard event
export function handlePaste(event: ClipboardEvent, cleanData: any, type: any): string | boolean {
    event.preventDefault(); // Prevent the default paste action

    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedData = clipboardData?.getData('text/plain');

    if (pastedData) {
        const isHtmlContent = htmlContentTest(pastedData);
        if (!isHtmlContent) {
            const cleanedData = pastedData.replace(replaceHtmlRegex, '').trim(); // 
            let convertedText: any;

            if (type === 'Text') {
                convertedText = cleanedData.replace(/\n/g, '<h1>'); // Convert \n to <h1>
            } else {
                convertedText = cleanedData.replace(/\n/g, '<p>'); // Convert \n to <p>
            }
            // const convertedText = cleanedData.replace(/\n/g, '<br>'); // Convert \n to <br>
            // Return the cleaned data to insert it into the editor
            return convertedText;
        } else {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = cleanData;

            const cleanedData = cleanHtmlData(tempElement.innerHTML);
            // Return the cleaned data to insert it into the editor
            return cleanedData;
        }
    }

    // Return false if no valid data was pasted
    return false;
}

// Function to check if the pasted data contains HTML content
export function htmlContentTest(content: string): boolean {
    return htmlRegex.test(content);
}