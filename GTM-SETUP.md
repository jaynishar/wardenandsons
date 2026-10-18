# Google Tag Manager (GTM) & GA4 Setup Guide

**Container ID:** `GTM-PK75ST2X`  
**Target Domain:** `https://wardenandsons.in`  
**Purpose:** Plain-English, step-by-step guide for non-developers to configure tracking tags, triggers, variables, and GA4 Key Events without touching website code.

---

## Overview of Tracked Events

The website automatically fires structured events into `window.dataLayer` whenever visitors interact with actions. No personal information (names, phone numbers, or message text) is ever tracked.

| Event Name | Description | Key Event in GA4? | Parameters Available |
| :--- | :--- | :---: | :--- |
| `whatsapp_click` | Visitor clicks a WhatsApp button or link | **YES (Key Event)** | `location` (`header`, `hero`, `sticky`, `product`, `footer`, `page`) |
| `send_enquiry` | Visitor sends their Request List on WhatsApp | **YES (Key Event)** | `items_count` (e.g. `1`, `3`) |
| `call_click` | Visitor taps a phone call button or link | **YES (Key Event)** | `location` |
| `add_to_request` | Visitor adds a clothing item to their Request List | No | `category`, `item` |
| `directions_click` | Visitor clicks for Google Maps driving directions | No | `location` |
| `bulk_form_submit` | Visitor submits the bulk uniform enquiry form | No | `form_type` |

---

## Step 1: Create Data Layer Variables in GTM

Before creating tags, set up Data Layer Variables so GA4 can record the extra details (like button location or item category):

1. Open [Google Tag Manager](https://tagmanager.google.com/) and select your container (`GTM-PK75ST2X`).
2. In the left navigation, click **Variables**.
3. Under **User-Defined Variables**, click **New**.
4. Create the following variables (choose Variable Type: **Data Layer Variable**):

| Variable Name in GTM | Data Layer Variable Name | Purpose |
| :--- | :--- | :--- |
| `dlv - location` | `location` | Records where the click happened (e.g. header, hero, footer) |
| `dlv - items_count` | `items_count` | Records how many items were in the Request List |
| `dlv - category` | `category` | Records the department (e.g. newborn, boys, girls) |
| `dlv - item` | `item` | Records the name of the clothing item added |

5. Click **Save** for each variable.

---

## Step 2: Create Triggers in GTM

Create one Custom Event trigger for each website event:

1. In GTM, click **Triggers** in the left navigation.
2. Click **New** -> click **Trigger Configuration** -> select **Custom Event**.
3. Create these 6 triggers:

### 1. Trigger: `CE - whatsapp_click`
- **Event name:** `whatsapp_click`
- **This trigger fires on:** All Custom Events

### 2. Trigger: `CE - send_enquiry`
- **Event name:** `send_enquiry`
- **This trigger fires on:** All Custom Events

### 3. Trigger: `CE - call_click`
- **Event name:** `call_click`
- **This trigger fires on:** All Custom Events

### 4. Trigger: `CE - add_to_request`
- **Event name:** `add_to_request`
- **This trigger fires on:** All Custom Events

### 5. Trigger: `CE - directions_click`
- **Event name:** `directions_click`
- **This trigger fires on:** All Custom Events

### 6. Trigger: `CE - bulk_form_submit`
- **Event name:** `bulk_form_submit`
- **This trigger fires on:** All Custom Events

---

## Step 3: Create GA4 Event Tags in GTM

Now link each trigger to a Google Analytics 4 Event Tag:

1. In GTM, click **Tags** in the left navigation.
2. Click **New** -> click **Tag Configuration** -> select **Google Analytics: GA4 Event**.
3. Enter your GA4 Measurement ID (e.g., `G-XXXXXXXXXX`).

Create each tag with the exact naming below:

### Tag 1: `GA4 - whatsapp_click`
- **Event Name:** `whatsapp_click`
- **Event Parameters:**
  - Parameter Name: `location` | Value: `{{dlv - location}}`
- **Triggering:** Select `CE - whatsapp_click`

### Tag 2: `GA4 - send_enquiry`
- **Event Name:** `send_enquiry`
- **Event Parameters:**
  - Parameter Name: `items_count` | Value: `{{dlv - items_count}}`
- **Triggering:** Select `CE - send_enquiry`

### Tag 3: `GA4 - call_click`
- **Event Name:** `call_click`
- **Event Parameters:**
  - Parameter Name: `location` | Value: `{{dlv - location}}`
- **Triggering:** Select `CE - call_click`

### Tag 4: `GA4 - add_to_request`
- **Event Name:** `add_to_request`
- **Event Parameters:**
  - Parameter Name: `category` | Value: `{{dlv - category}}`
  - Parameter Name: `item` | Value: `{{dlv - item}}`
- **Triggering:** Select `CE - add_to_request`

### Tag 5: `GA4 - directions_click`
- **Event Name:** `directions_click`
- **Event Parameters:**
  - Parameter Name: `location` | Value: `{{dlv - location}}`
- **Triggering:** Select `CE - directions_click`

### Tag 6: `GA4 - bulk_form_submit`
- **Event Name:** `bulk_form_submit`
- **Triggering:** Select `CE - bulk_form_submit`

---

## Step 4: Test in GTM Preview Mode

Before publishing to your live visitors, test that tags fire properly:

1. In the top-right corner of GTM, click the blue **Preview** button.
2. In Tag Assistant, enter your site URL: `https://wardenandsons.in/` (or your local test URL).
3. Click **Connect**. Your website will open in a new tab with the Tag Assistant badge connected.
4. Perform these actions on your website:
   - Click a WhatsApp button -> Check Tag Assistant: verify `GA4 - whatsapp_click` fired.
   - Click "Add to Request" on a clothing item -> verify `GA4 - add_to_request` fired.
   - Open Request List and click "Send Enquiry on WhatsApp" -> verify `GA4 - send_enquiry` fired.
   - Click any telephone link -> verify `GA4 - call_click` fired.
   - Click Google Maps directions link -> verify `GA4 - directions_click` fired.
5. In Tag Assistant, click into any event on the left timeline and click **Variables** or **Values** to verify no personal data is sent.
6. Return to GTM and click **Submit** -> enter Version Name (e.g., `v1.0 - WhatsApp & Request List Tracking`) -> click **Publish**.

---

## Step 5: Mark Key Events in Google Analytics 4

To count these enquiries as conversion goals in GA4:

1. Open [Google Analytics](https://analytics.google.com/) and go to your **Warden & Sons** property.
2. Click the gear icon (**Admin**) in the bottom-left corner.
3. Under **Data display**, click **Events** (or **Key events**).
4. Once you have tested the site or within 24 hours of live traffic, these event names will appear in the list.
5. Toggle the switch to **Mark as key event** for these three primary business drivers:
   - ✅ `whatsapp_click`
   - ✅ `send_enquiry`
   - ✅ `call_click`
6. *(Optional)* If the event has not appeared yet, click **New key event**, type `whatsapp_click` (and `send_enquiry`, `call_click`) manually, and click **Save**.

Your conversions and advertising attribution are now actively tracking in GA4!
