# Google Sheet & Callback Leads Setup Guide

This guide walks through setting up the private Google Sheet and Google Apps Script web app endpoint that receives "Prefer a call?" requests from `https://wardenandsons.in`.

---

## 1. Create the Private Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a **Blank spreadsheet**.
2. Rename the spreadsheet to: `Warden & Sons - Website Callback Leads (Private)`.
3. In **Row 1**, enter the exact 11 column headers across columns A through K:
   - **A1**: `Timestamp`
   - **B1**: `Phone`
   - **C1**: `Name`
   - **D1**: `Preferred Time`
   - **E1**: `Summary`
   - **F1**: `Source`
   - **G1**: `UTM Source`
   - **H1**: `UTM Medium`
   - **I1**: `UTM Campaign`
   - **J1**: `Reference`
   - **K1**: `Status`
4. Bold Row 1 and freeze it: click **View > Freeze > 1 row**.

> [!CAUTION]
> **Keep This Sheet Strictly Private!**  
> Never change sharing settings to "Anyone with the link". Access must remain restricted exclusively to authorized Warden & Sons shop staff and management Google accounts.

---

## 2. Install the Google Apps Script

1. In the Google Sheet menu, click **Extensions > Apps Script**.
2. In the Apps Script code editor, delete any existing default code inside `Code.gs`.
3. Open [`docs/leads-apps-script.gs`](./leads-apps-script.gs) in this repository, copy all the code, and paste it into the Apps Script editor.
4. Rename the script project at the top left from `Untitled project` to `Warden & Sons Leads Web App`.
5. Click the **Save** icon (disk icon) or press `Ctrl + S` (`Cmd + S` on Mac).

---

## 3. Deploy as a Web App

1. At the top right of the Apps Script window, click the blue **Deploy** button and select **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment configuration:
   - **Description**: `Production Callback Leads Endpoint v1`
   - **Execute as**: `Me (your email address)`
   - **Who has access**: `Anyone` *(Note: "Anyone" allows website visitors' browsers to submit data without needing a Google sign-in; your underlying Google Sheet remains completely private and unreachable).*
4. Click **Deploy**.
5. If prompted, click **Authorize access**, choose your Google account, click **Advanced > Go to Warden & Sons Leads Web App (unsafe)**, and click **Allow**.
6. When the deployment finishes, copy the generated **Web App URL** (looks like `https://script.google.com/macros/s/AKfycbx.../exec`).

---

## 4. Configure Your Environment

1. For local development, add or edit the variable in your `.env.local` file:
   ```bash
   NEXT_PUBLIC_LEADS_ENDPOINT=https://script.google.com/macros/s/AKfycbx.../exec
   ```
2. For production deployment, add `NEXT_PUBLIC_LEADS_ENDPOINT` as a repository secret or build environment variable in GitHub Actions (`.github/workflows/deploy.yml`) and your static hosting environment.

*Note: If `NEXT_PUBLIC_LEADS_ENDPOINT` is unset or blank, the "Prefer a call?" button will be automatically hidden across the entire website.*

---

## 5. Test with One Row

1. Start your development server or visit the website with the environment variable active.
2. Add an item to your inquiry list, open **My list**, click **Prefer a call?**.
3. Fill in a test 10-digit mobile number, tick the consent box, and click **Request a call**.
4. Check your Google Sheet: a new row should appear with:
   - Current ISO timestamp
   - Validated `+91XXXXXXXXXX` phone number
   - Garment inquiry summary
   - Reference code (e.g. `WS-XXXXX`)
   - Status set to `New`

---

## 6. How to View, Manage and Delete Leads

- **Contacting Customers**: Shop staff can review rows marked with status `New`, call the customer during store hours (9:00 AM – 9:00 PM), and update the Status column to `Called`, `In WhatsApp`, or `Closed`.
- **Deleting Records (Customer Erasure Requests)**: If a customer requests removal of their phone number, locate their row by reference code or phone number, right-click the row number on the left margin, and select **Delete row**.
