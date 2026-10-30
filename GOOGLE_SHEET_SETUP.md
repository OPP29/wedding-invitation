# 📊 Google Sheets RSVP Integration Guide

This wedding invitation website can send all guest RSVPs directly into your personal **Google Sheet** in real-time.

---

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.new) in your browser.
2. Name your spreadsheet: **Monika & Ritesh Wedding RSVPs**.
3. In Row 1, add these column headers:
   - **Column A:** `Timestamp`
   - **Column B:** `Full Name`
   - **Column C:** `Phone / WhatsApp`
   - **Column D:** `Attendance`
   - **Column E:** `Number of Guests`
   - **Column F:** `Events Attending`
   - **Column G:** `Dietary / Meal Preference`
   - **Column H:** `Wishes / Notes`

---

### Step 2: Add the Google Apps Script
1. In your Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any code in the editor, and paste the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.name || "",
      data.phone || "",
      data.attendance === "attending" ? "Attending" : "Regrets",
      data.attendees || "1",
      data.events || "",
      data.dietary || "",
      data.notes || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

### Step 3: Deploy as Web App
1. At the top right of the Apps Script window, click the blue **Deploy** button > **New deployment**.
2. Select type: **Web app** (gear icon).
3. Fill in:
   - **Description:** Wedding RSVP Webhook
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone` *(Crucial so guests can submit RSVP without logging into Google)*
4. Click **Deploy**.
5. Grant permissions if prompted by Google.
6. Copy the **Web App URL** (it looks like `https://script.google.com/macros/s/.../exec`).

---

### Step 4: Paste into your Website Code
1. Open `src/data/weddingData.js`.
2. Locate `googleSheetScriptUrl: "",`
3. Paste your URL inside the quotes:
   ```javascript
   googleSheetScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec",
   ```
4. Save the file! All RSVPs will now automatically populate into your Google Sheet!

> **Note:** Even without setting up Google Sheets right away, the website has:
> - A local browser backup that saves all RSVPs automatically.
> - A direct "Notify Pandit Family on WhatsApp" button that sends the RSVP instantly to the family via WhatsApp!
