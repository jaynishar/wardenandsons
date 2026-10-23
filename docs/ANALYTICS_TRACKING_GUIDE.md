# Warden & Sons Kids Wear — Advanced Analytics, Tracking & CRO Playbook

**Website:** [https://wardenandsons.in](https://wardenandsons.in)  
**Production GA4 Property:** `G-FNQNXJJVQ3`  
**GTM Container ID (Optional / Standby):** `GTM-PK75ST2X`  
**Framework:** Next.js 15 App Router (Static Export `output: 'export'`) + React 19 + TypeScript  

---

## 1. Executive Summary & Architecture

Warden & Sons Kids Wear operates an editorial, dual-channel retail experience: families can browse cotton basics, newborn sets, playwear, and uniforms online, and seamlessly transition into high-touch WhatsApp consultations or visit the physical Kemps Corner store.

To understand customer acquisition, product interest, and conversion drivers without violating customer privacy or slowing down the website, we have implemented a high-performance tracking architecture featuring:
- **Google Consent Mode v2 Default Integration:** Defaults advertising and personalization storage to denied; allows users to accept all or choose essential-only analytics via an accessible, boutique consent banner.
- **Direct GA4 Native Scripting with Fallback:** Resolves previous silent failures where lack of environment variables during static export omitted tracking scripts entirely.
- **Type-Safe Central Tracking Engine (`src/lib/analytics.ts`):** Dual-dispatches to `gtag` and `dataLayer`, strictly following GA4 recommended event taxonomy.
- **Zero-PII Lead Generation:** Refactored form handlers so that contact forms and bulk order enquiries only track upon passing full schema validation. Customer names, phones, email addresses, and private notes are never sent to analytics platforms.
- **Privacy-Preserving Inbound Attribution (`src/lib/attribution.ts`):** Captures inbound UTM parameters and referrers into `sessionStorage` on landing; enriches outbound WhatsApp pre-filled enquiries with concise origin tags (e.g., `Ref: Instagram Bio`).

---

## 2. Event Tracking Dictionary

| Event Name | Trigger Condition | Safe Parameters Collected | Intended Business Use |
| :--- | :--- | :--- | :--- |
| `page_view` | Initial page load and client-side route transitions (with strict deduplication) | `page_location`, `page_path`, `page_title` | Measures total footfall, page popularity, and organic navigation paths. |
| `view_item_list` | User selects or filters a category pill in the catalogue (e.g. Newborns, Boys) | `item_list_name`, `item_count` | Identifies which garment departments attract the most customer interest. |
| `select_item` | User clicks on a product card or views product details | `items: [{ item_id, item_name, item_category, price }]` | Measures click-through interest per specific garment design. |
| `search` | User searches for fabric or garment types in catalogue search bar (debounced 600ms) | `search_term`, `result_count` | Identifies what parents are looking for (e.g., "muslin", "combed cotton", "interlock"). |
| `add_to_cart` | User clicks "Add to Request" on a product card | `items: [{ item_id, item_name, item_category, quantity }]` | Gauges purchase intent and high-demand products for stocking. |
| `remove_from_cart` | User removes an item from their Request List drawer | `items: [{ item_id, item_name, item_category }]` | Identifies friction or second thoughts before enquiry submission. |
| `view_cart` | User opens the Request List sliding drawer | `items_count` | Measures review rate of selected items before WhatsApp launch. |
| `whatsapp_click` | User clicks any WhatsApp CTA across the site | `button_location` (`header`, `hero`, `product`, `request_list`, `footer`, `sticky_bar`, `video_call`), `category`, `enquiry_type`, `item_id`, `item_name` | **Highest priority KPI:** Measures which buttons, pages, and products drive conversations. |
| `generate_lead` | User submits a valid bulk order enquiry, contact form, or initiates a request list order | `lead_type` (`bulk_order`, `contact_form`, `request_list`), `category`, `items_count` | Core conversion metric for qualified customer intent. |
| `form_submit` | Bulk order or contact form validation passes and opens WhatsApp | `form_name`, `category` | Measures enquiry volume by department without collecting personal data. |
| `get_directions` | User clicks Google Maps or Directions link to Kemps Corner boutique | `store_name`, `placement` (`footer`, `visit_us_page`) | Measures physical store footfall intent from South Mumbai residents. |
| `phone_click` | User taps direct phone or landline calling links | `phone_target`, `placement` | Measures phone call enquiries to the shop counter. |

---

## 3. Step-by-Step Guide: Verifying Events in GA4 DebugView

Follow these steps to confirm events are firing in real-time:

1. **Install Google Analytics Debugger Extension:**
   - Install the official **Google Analytics Debugger** Chrome extension from the Chrome Web Store.
   - Click the extension icon to toggle it **ON**.
2. **Open the Website:**
   - Navigate to [https://wardenandsons.in](https://wardenandsons.in) in Chrome.
   - Open Developer Tools (`F12`) and view the **Console**. You will see `[Analytics Event]` logs with payload parameters.
3. **Open Google Analytics:**
   - Log in to [analytics.google.com](https://analytics.google.com).
   - Select property `G-FNQNXJJVQ3` (Warden & Sons Kids Wear).
   - In the left sidebar, click **Admin** (gear icon) → **Data display** → **DebugView**.
4. **Perform Test Actions:**
   - Click a WhatsApp button in the header: verify `whatsapp_click` appears with `button_location: "header"`.
   - Add a product to the Request List: verify `add_to_cart` appears with the garment's name and category.
   - Open the Request List and tap "Send Enquiry": verify `whatsapp_click` and `generate_lead` appear.
   - Filter the catalogue to "Newborns": verify `view_item_list` appears with `item_list_name: "newborn"`.

---

## 4. Step-by-Step Guide: Google Search Console

1. **Add Verification Meta Tag (If Not Already Verified):**
   - In Google Search Console, select **Add Property** → **URL prefix** → `https://wardenandsons.in/`.
   - Choose verification method **HTML tag**.
   - Copy the verification token (e.g., `google-site-verification=abc...xyz`).
   - Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc...xyz` to your hosting environment or GitHub Secrets. Next.js will automatically output the `<meta name="google-site-verification" content="..." />` tag.
   - Click **Verify** in Search Console.
2. **Submit Canonical Sitemap:**
   - In Search Console, click **Sitemaps** in the left menu.
   - Enter `sitemap.xml` and click **Submit**.
   - Confirm status shows green **Success**.
3. **Weekly Query & Landing Page Monitoring:**
   - Navigate to **Performance** → **Search Results**.
   - Review **Queries** tab: identify high-intent local queries such as *"kids clothes south mumbai"*, *"cotton newborn clothes kemps corner"*, *"school uniforms mumbai"*.
   - Review **Pages** tab: confirm `/shop/newborn/`, `/bulk-orders/`, and blog sizing guides receive organic impressions and clicks.

---

## 5. Offline Sales Tracking: Connecting WhatsApp to Store Counter Sales

Because sales are finalized on WhatsApp or at the physical counter in Kemps Corner, use this simple private tracking sheet (Google Sheets or Excel) to measure return on investment:

### Recommended CRM / Spreadsheet Columns

| Date | Customer Reference | Channel / Source | Garment / Enquiry Type | Attributed Origin (from message tag) | Outcome | Value (₹) | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-10-24 | Ref-101 | WhatsApp | Newborn Cotton Layette | Ref: Instagram Bio | Purchased | ₹3,200 | Local Dunzo delivery to Malabar Hill |
| 2026-10-24 | Ref-102 | Store Visit | Boys School Uniform | Ref: Google Search | Purchased | ₹4,800 | Visited Kemps Corner shop in person |
| 2026-10-25 | Ref-103 | WhatsApp | Bulk Sports Track Pants | Ref: Bulk Form | Quoted | Pending | School sports day quotation for 60 sets |

> **Privacy Rule:** Keep this spreadsheet on the private shop computer. Never upload customer phone numbers, names, or individual financial transactions to public advertising platforms.

---

## 6. Monthly CRO & Analytics Routine (30-Minute Check)

On the 1st of every month, answer these 5 key questions:

1. **Which product categories generated the most WhatsApp chats?**
   - In GA4, go to **Reports** → **Engagement** → **Events** → Click `whatsapp_click` → View breakdown by `category`.
2. **What are the top landing pages driving enquiries?**
   - In GA4, go to **Reports** → **Engagement** → **Pages and screens** → Filter conversions by `generate_lead`.
3. **What terms did customers search for on Google?**
   - In Google Search Console, review **Queries** with high impressions but low CTR to optimize titles and descriptions.
4. **Did visitors drop off before launching WhatsApp?**
   - Compare `view_cart` events with `whatsapp_click` events in the cart drawer. If the drop-off is high, consider adding more reassuring copy or delivery notes.
5. **How many WhatsApp chats turned into actual sales?**
   - Review the monthly total in the offline spreadsheet. Calculate: `(Total Purchases / Total WhatsApp Enquiries) * 100` to find your WhatsApp closing rate.

---

## 7. Rollback Instructions

If tracking changes ever need to be reverted:

1. **Reverting via Git:**
   ```bash
   git revert HEAD
   git push origin main
   ```
2. **Disabling Tracking Temporarily:**
   - In `src/config/site.ts`, set `gaMeasurementId: ''` and `gtmId: ''`.
   - Re-run `npm run build`. This eliminates all tracking tags without modifying UI components.
