import { cleanHtmlData, htmlRegex, replaceHtmlRegex } from "../email-composer/constants";

// handlePaste function to process the clipboard event
export function handlePaste(event: ClipboardEvent, cleanData: any): string | boolean {
    event.preventDefault(); // Prevent the default paste action

    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedData = clipboardData?.getData('text/plain');

    if (pastedData) {
        const isHtmlContent = htmlContentTest(pastedData);
        if (!isHtmlContent) {
            const cleanedData = pastedData.replace(replaceHtmlRegex, '').trim(); // 
            // Return the cleaned data to insert it into the editor
            return cleanedData;
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