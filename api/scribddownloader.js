// api/downloadscribd.js
// This file contains functions to communicate with the backend Scribd downloader API.

// The base URL of your backend server.
// During development, this will likely be http://localhost:3001.
// In production, you would change this to your actual domain name.
// const BASE_URL = 'http://localhost:4009';
const BASE_URL = 'https://api-scribd.rohitkushwaha.com';


/**
 * Sends the Scribd URL to the backend for processing.
 * @param {string} url - The full URL of the Scribd document.
 * @returns {Promise<object>} A promise that resolves to the server's JSON response,
 * which includes the downloadUrl and title.
 */
export const processScribdUrl = async (url) => {
    try {
        const response = await fetch(`${BASE_URL}/api/process-url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        const data = await response.json();

        if (!response.ok) {
            // If the server returns an error (e.g., 400 or 500), throw an error.
            throw new Error(data.message || 'An unknown error occurred on the server.');
        }

        return data; // Expected to be { success: true, downloadUrl: '...', title: '...' }

    } catch (error) {
        console.error('Error processing URL:', error);
        // Re-throw the error so the UI component can catch it and display a message.
        throw error;
    }
};

export const getPageCount = async (url) => {
    try {
        const response = await fetch(`${BASE_URL}/api/get-page-count`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        const data = await response.json();

        if (!response.ok) {
            // If the server returns an error (e.g., 400 or 500), throw an error.
            throw new Error(data.message || 'An unknown error occurred on the server.');
        }

        return data; // Expected to be { success: true, downloadUrl: '...', title: '...' }

    } catch (error) {
        console.error('Error getting page count:', error);
        // Re-throw the error so the UI component can catch it and display a message.
        throw error;
    }
};

/**
 * Triggers the download of the generated PDF file in the user's browser.
 * The browser will use the filename provided by the server.
 * @param {string} downloadPath - The relative path returned by the server (e.g., /downloads/document.pdf).
 */
// export const triggerPdfDownload = (downloadPath) => {
//     // Construct the full URL to the file
//     const fullUrl = `${BASE_URL}${downloadPath}`;
    
//     // Create a temporary anchor (<a>) element to trigger the download
//     const link = document.createElement('a');
//     link.href = fullUrl;
    
//     // The 'download' attribute, when empty, tells the browser to download the file
//     // using the filename from the server's 'Content-Disposition' header.
//     link.setAttribute('download', '');
    
//     // Append the link to the body, click it, and then remove it.
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// };


export const triggerPdfDownload = (downloadPath) => {
    // 1. Extract just the filename from the path.
    // e.g., from "/downloads/document_abc123.pdf" we get "document_abc123.pdf"
    const filename = downloadPath.split('/').pop();

    if (!filename) {
        console.error("Could not extract filename from download path.");
        return;
    }

    // 2. Construct the URL to the API endpoint that forces the download.
    const apiUrl = `${BASE_URL}/api/download-file/${filename}`;

    // 3. Open this URL. The browser will receive the 'Content-Disposition'
    // header from the server and initiate a download automatically.
    // This is the most reliable way to trigger a download from an API.
    window.open(apiUrl, '_blank');
};