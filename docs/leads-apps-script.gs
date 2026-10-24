/**
 * Warden & Sons Kids Wear — Callback Leads Intake Web App
 * Google Apps Script endpoint receiving callback requests from the website.
 *
 * Appends rows to the active private spreadsheet:
 * [Timestamp, Phone, Name, Preferred Time, Summary, Source, UTM Source, UTM Medium, UTM Campaign, Reference, Status]
 *
 * Privacy Rules:
 * - NEVER log phone numbers or personal names to Logger.log.
 * - Always use LockService to prevent race conditions during concurrent requests.
 * - Enforces server-side validation of consent and phone format (+91XXXXXXXXXX).
 */

function doPost(e) {
  var output = { ok: false };

  try {
    // 1. Verify postData exists
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'Missing request body' });
    }

    // 2. Parse incoming JSON
    var data = JSON.parse(e.postData.contents);

    // 3. Server-side validation: consent must be explicitly true
    if (data.consent !== true) {
      return jsonResponse({ ok: false, error: 'Consent is required' });
    }

    // 4. Server-side validation: phone must match +91[6-9]XXXXXXXXX
    var phone = String(data.phone || '').trim();
    var phoneRegex = /^\+91[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return jsonResponse({ ok: false, error: 'Invalid phone format' });
    }

    // 5. Concurrency control via LockService (wait up to 10 seconds)
    var lock = LockService.getScriptLock();
    try {
      lock.waitLock(10000);
    } catch (lockError) {
      return jsonResponse({ ok: false, error: 'Lock acquisition timeout' });
    }

    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

      // Build row matching exact spec columns:
      // [timestamp, phone, name, preferredTime, summary, source, utm_source, utm_medium, utm_campaign, reference, status]
      var row = [
        data.timestamp || new Date().toISOString(),
        phone,
        String(data.name || '').slice(0, 100),
        String(data.preferredTime || '').slice(0, 50),
        String(data.summary || '').slice(0, 1000),
        String(data.source || '').slice(0, 200),
        String(data.utm_source || '').slice(0, 100),
        String(data.utm_medium || '').slice(0, 100),
        String(data.utm_campaign || '').slice(0, 100),
        String(data.reference || '').slice(0, 50),
        'New'
      ];

      sheet.appendRow(row);

      // Safe logging: log ONLY reference code and timestamp (zero PII)
      Logger.log('Lead successfully appended. Ref: ' + (data.reference || 'N/A'));

      output = { ok: true };
    } finally {
      lock.releaseLock();
    }

    return jsonResponse(output);
  } catch (err) {
    Logger.log('doPost error: ' + (err.message || 'Unknown error'));
    return jsonResponse({ ok: false, error: 'Internal server error' });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
