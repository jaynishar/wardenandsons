import assert from 'node:assert';
import {
  formatWhatsAppRequestMessage,
  buildWhatsAppRequestUrl,
  MAX_SAFE_WHATSAPP_MESSAGE_LENGTH,
} from '../src/lib/whatsapp.ts';

console.log('--- Running WhatsApp Message Formatting & URL Tests ---');

// Test 1: Empty list
{
  const msg = formatWhatsAppRequestMessage({ items: [] });
  assert.ok(msg.includes('Hello Warden & Sons Kids Wear!'));
  assert.ok(!msg.includes('1.'));
  console.log('✓ Test 1: Empty list handled gracefully');
}

// Test 2: Single item with all fields
{
  const item = {
    id: 'test-1',
    productId: 'cat-nb-01',
    name: 'Cotton Bodysuit',
    category: 'newborn',
    subCategory: 'Bodysuits',
    quantity: 2,
    ageGroup: '3-6M',
    size: 'Size 18',
    preferredColor: 'Pastel Blue',
    styleNotes: 'Loose fit preferred',
  };
  const msg = formatWhatsAppRequestMessage({
    items: [item],
    customerName: 'Aarav Mehta',
    notes: 'Please ship urgently if possible',
  });

  assert.ok(msg.includes('1. Cotton Bodysuit'));
  assert.ok(msg.includes('Quantity: 2'));
  assert.ok(msg.includes('Age / Group: 3-6M'));
  assert.ok(msg.includes('Size: Size 18'));
  assert.ok(msg.includes('Preferred colour/style: Pastel Blue'));
  assert.ok(msg.includes('Notes: Loose fit preferred'));
  assert.ok(msg.includes('Customer Name: Aarav Mehta'));
  assert.ok(msg.includes('Additional requirements: Please ship urgently if possible'));
  assert.ok(msg.includes('confirm current pricing and availability'));
  console.log('✓ Test 2: Single item formatted with exact details');
}

// Test 3: Special characters & punctuation
{
  const item = {
    id: 'test-3',
    productId: 'cat-by-01',
    name: 'Boys’ Twill & Cotton Shorts (2-3Y & 4-5Y)',
    category: 'boys',
    subCategory: 'Shorts & Bottoms',
    quantity: 1,
    size: '100% Cotton / "Regular" Fit',
    styleNotes: 'Cost < 500? & colors: Red & Navy!',
  };
  const msg = formatWhatsAppRequestMessage({ items: [item] });
  const url = buildWhatsAppRequestUrl(msg);

  // URL decoding test
  const decodedText = decodeURIComponent(url.split('text=')[1]);
  assert.strictEqual(decodedText, msg);
  assert.ok(decodedText.includes('Boys’ Twill & Cotton Shorts'));
  assert.ok(decodedText.includes('Cost < 500? & colors: Red & Navy!'));
  console.log('✓ Test 3: Special characters and URL encode/decode verified perfectly');
}

// Test 4: Unicode, Hindi & Emoji
{
  const item = {
    id: 'test-4',
    productId: 'cat-gr-01',
    name: 'Floral Muslin Frock 🌸 (गुलाबी / Pink)',
    category: 'girls',
    subCategory: 'Dresses',
    quantity: 1,
    preferredColor: 'गुलाबी / Soft Pink ✨',
  };
  const msg = formatWhatsAppRequestMessage({ items: [item] });
  const url = buildWhatsAppRequestUrl(msg);
  const decodedText = decodeURIComponent(url.split('text=')[1]);

  assert.strictEqual(decodedText, msg);
  assert.ok(decodedText.includes('गुलाबी'));
  assert.ok(decodedText.includes('🌸'));
  assert.ok(decodedText.includes('✨'));
  console.log('✓ Test 4: Unicode, Hindi script and emojis verified in message & decoded URL');
}

// Test 5: Long list size guard
{
  const manyItems = Array.from({ length: 40 }, (_, i) => ({
    id: `item-${i}`,
    productId: `prod-${i}`,
    name: `Premium Long Title Item Number ${i} With Generous Description`,
    category: 'boys',
    subCategory: 'T-Shirts & Tops',
    quantity: i + 1,
    ageGroup: '10-12 Years Old',
    size: `Size Specification Extra Large ${i}`,
    preferredColor: `Vibrant Solid Colour Shade Code ${i}`,
    styleNotes: `Special tailoring note for shop team to inspect closely number ${i}`,
  }));

  const msg = formatWhatsAppRequestMessage({
    items: manyItems,
    customerName: 'Bulk Institutional Customer Mumbai',
    notes: 'Please quote pricing for full bulk order',
  });

  assert.ok(msg.length <= MAX_SAFE_WHATSAPP_MESSAGE_LENGTH);
  assert.ok(msg.includes('[Note: Request truncated due to WhatsApp message size limit'));
  console.log('✓ Test 5: Long-list size guard successfully limits message under 1800 chars');
}

// Test 6: Truthfulness check — no false promises
{
  const msg = formatWhatsAppRequestMessage({
    items: [
      {
        id: 'truth-1',
        productId: 'truth-1',
        name: 'Item A',
        category: 'newborn',
        subCategory: 'Onesies',
        quantity: 1,
      },
    ],
  });
  // Must never claim payment is done or item is guaranteed in stock
  assert.ok(!msg.includes('Payment completed'));
  assert.ok(!msg.includes('Guaranteed in stock'));
  assert.ok(msg.includes('confirm current pricing and availability'));
  console.log('✓ Test 6: Message preserves truthful enquiry language');
}

console.log('\n--- ALL WHATSAPP UNIT TESTS PASSED! ---');
