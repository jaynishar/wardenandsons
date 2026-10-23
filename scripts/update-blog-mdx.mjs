import fs from 'fs';
import path from 'path';

console.log('Updating 12 blog posts with contextual links and trailing slashes...');

// Post 1: baby-swaddling-blankets-bathrobes.mdx
{
  const p = 'src/content/blog/baby-swaddling-blankets-bathrobes.mdx';
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('/shop/newborn/')) {
    c = c.replace(
      'At **Warden & Sons Kids Wear**, located at Kemps Corner, South Bombay, we guide new parents daily. Here is our comprehensive guide to selecting the best **baby swaddle blankets in Mumbai**, wraps, and bath towels.',
      'At **Warden & Sons Kids Wear**, located at Kemps Corner, South Bombay, we guide new parents daily. Explore our curated [Newborn Baby Clothes & Swaddles](/shop/newborn/) collection for pure combed cotton jhablas, onesies, and organic baby blankets. Here is our comprehensive guide to selecting the best **baby swaddle blankets in Mumbai**, wraps, and bath towels.'
    );
  }
  if (!c.includes('/blog/newborn-clothing-essentials-mumbai/')) {
    c = c.replace(
      '- **100% Muslin Cotton:** This is the gold standard. Muslin is a lightweight, open-weave fabric that allows heat to escape and air to circulate, keeping the baby perfectly cool.',
      '- **100% Muslin Cotton:** This is the gold standard. Muslin is a lightweight, open-weave fabric that allows heat to escape and air to circulate, keeping the baby perfectly cool. Pairing your muslin swaddle with breathable base layers is essential; consult our checklist on [Newborn Clothing Essentials in Mumbai](/blog/newborn-clothing-essentials-mumbai/) for hospital bag planning.'
    );
  }
  if (!c.includes('/blog/kids-clothing-size-chart-guide/')) {
    c = c.replace(
      '- **Visit Our Shop:** Drop by Kemps Corner, South Bombay to see our range of baby blankets, swaddles, and hooded towels.',
      '- **Visit Our Shop:** Drop by Kemps Corner, South Bombay to see our range of baby blankets, swaddles, and hooded towels (get directions on our [Visit Us](/visit-us/) page).\n- **Sizing Guidance:** Unsure about size brackets for infant sleepsuits? Review our [Kids Clothes Size Chart Guide](/blog/kids-clothing-size-chart-guide/) or learn [how to buy kids clothes on WhatsApp](/blog/how-to-buy-kids-clothes-whatsapp/).'
    );
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('✅ Post 1 updated');
}

// Post 2: best-sportswear-kids-guide.mdx
{
  const p = 'src/content/blog/best-sportswear-kids-guide.mdx';
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('/shop/boys/')) {
    c = c.replace(
      'We offer a wide range of kids activewear, cricket whites, football jerseys, and swimwear at our Kemps Corner boutique.',
      'We offer a wide range of kids activewear, cricket whites, football jerseys, and swimwear at our Kemps Corner boutique. Browse our dedicated [Boys Cotton Clothes & Activewear (0-16Y)](/shop/boys/) collection for coaching academy cricket whites and training shorts.'
    );
  }
  if (!c.includes('/blog/school-uniform-bulk-clothing-mumbai/')) {
    c = c.replace(
      'If your child is enrolled in a cricket coaching camp in Mumbai, you will need a few sets of cricket whites.',
      'If your child is enrolled in a cricket coaching camp in Mumbai, you will need a few sets of cricket whites. If your academy or club team requires custom logos or monogrammed sets, explore our guide to [School Uniform & Bulk Clothing Orders in Mumbai](/blog/school-uniform-bulk-clothing-mumbai/).'
    );
  }
  if (!c.includes('/blog/kids-clothing-size-chart-guide/')) {
    c = c.replace(
      '1.  **Don\'t Buy Too Large:** While buying a size up in casual wear is a common parental practice to save money, sportswear should fit relatively close to the body.',
      '1.  **Don\'t Buy Too Large:** While buying a size up in casual wear is a common parental practice to save money, sportswear should fit relatively close to the body. For exact chest, shoulder, and waist measurements across age groups 2 to 16, refer to our [Kids Clothes Size Chart Guide](/blog/kids-clothing-size-chart-guide/) or check base layers in our [Cotton Innerwear Basics Guide](/blog/innerwear-basics-guide-cotton/).'
    );
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('✅ Post 2 updated');
}

// Post 3: boys-vs-girls-nightwear-fabrics.mdx
{
  const p = 'src/content/blog/boys-vs-girls-nightwear-fabrics.mdx';
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('/shop/girls/')) {
    c = c.replace(
      'We invite you to browse our curated collection of cotton, hosiery, and muslin nightwear at our Kemps Corner store.',
      'We invite you to browse our curated collection of cotton, hosiery, and muslin nightwear at our Kemps Corner store. Explore our [Girls Cotton Dresses & Sleepwear (0-16Y)](/shop/girls/) and [Boys Cotton Clothes & Nightsuits (0-16Y)](/shop/boys/) to pick favorites for your Request List.'
    );
  }
  if (!c.includes('/blog/kids-winterwear-guide-mumbai/')) {
    c = c.replace(
      '- **Best For:** Kids who prefer loose, structured clothing and for cooler monsoon and mild winter nights.',
      '- **Best For:** Kids who prefer loose, structured clothing and for cooler monsoon and mild winter nights. When coastal temperatures dip slightly from November to January, explore our [Kids Winterwear Guide for Mumbai](/blog/kids-winterwear-guide-mumbai/) for light layering and pyjama sets.'
    );
  }
  if (!c.includes('/blog/innerwear-basics-guide-cotton/')) {
    c = c.replace(
      '- **Size Up slightly:** Nightwear should never be skin-tight. A slightly looser fit allows air to circulate between the fabric and skin, keeping them cool.',
      '- **Size Up slightly:** Nightwear should never be skin-tight. A slightly looser fit allows air to circulate between the fabric and skin, keeping them cool. For everyday base layers underneath nightwear or school clothes, check our [Cotton Innerwear Basics Guide](/blog/innerwear-basics-guide-cotton/).'
    );
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('✅ Post 3 updated');
}

// Post 4: custom-matching-family-outfits-festivals.mdx
{
  const p = 'src/content/blog/custom-matching-family-outfits-festivals.mdx';
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace('/bulk-orders)', '/bulk-orders/)');
  if (!c.includes('/shop/men/')) {
    c = c.replace(
      '- **Coordinated Festive Wear:** High-quality cotton shirts for boys and men, and matching tops, shorts, or dresses for girls and women.',
      '- **Coordinated Festive Wear:** High-quality cotton shirts for boys and men, and matching tops, shorts, or dresses for girls and women. Explore our [Men\'s Cotton Loungewear & Basics](/shop/men/) and [Women\'s Muslin Sleepwear & Basics](/shop/women/) collections for family lounge sets.'
    );
  }
  if (!c.includes('/blog/school-uniform-bulk-clothing-mumbai/')) {
    c = c.replace(
      'Tailoring and custom printing take time. For small groups (3 to 6 members), place your order at least **2 to 3 weeks** before the event.',
      'Tailoring and custom printing take time. Organizing institutional or school athletic apparel alongside festive orders? Read our detailed guide on [School Uniform & Bulk Clothing Orders in Mumbai](/blog/school-uniform-bulk-clothing-mumbai/). For small groups (3 to 6 members), place your order at least **2 to 3 weeks** before the event.'
    );
  }
  if (!c.includes('/visit-us/')) {
    c = c.replace(
      '- **Store Visit:** Walk into our Kemps Corner store to inspect fabric samples and review styling options.',
      '- **Store Visit:** Walk into our [Kemps Corner boutique](/visit-us/) to inspect fabric samples and review styling options.\n- **Remote Ordering:** Learn [how to buy kids clothes on WhatsApp](/blog/how-to-buy-kids-clothes-whatsapp/) with flat tape sizing verified before packing.'
    );
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('✅ Post 4 updated');
}

// Post 5: how-to-buy-kids-clothes-whatsapp.mdx
{
  const p = 'src/content/blog/how-to-buy-kids-clothes-whatsapp.mdx';
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('/shop/')) {
    c = c.replace(
      'Experience the easiest way to shop for kids\' wear. Connect with the **Warden & Sons** family today and let us take care of your children\'s clothing needs.',
      'Experience the easiest way to shop for kids\' wear. You can browse our online [Children\'s Cotton Clothing Catalogue](/shop/) first, add items to your digital Request List, and send it directly to our desk. Connect with the **Warden & Sons** family today and let us take care of your children\'s clothing needs.'
    );
  }
  if (!c.includes('/how-it-works/')) {
    c = c.replace(
      'Shopping with us on WhatsApp is as simple as texting a friend. Follow these four easy steps:',
      'Shopping with us on WhatsApp is as simple as texting a friend. For a visual step-by-step summary of our counter workflow, see our dedicated [How WhatsApp Catalogue Shopping Works](/how-it-works/) guide. Follow these four easy steps:'
    );
  }
  if (!c.includes('/blog/kids-clothing-size-chart-guide/')) {
    c = c.replace(
      '3.  **Personalized Size Help:** Tell us your child\'s age, height, and build. We will recommend the exact size, measuring the garments live with a tape if necessary.',
      '3.  **Personalized Size Help:** Tell us your child\'s age, height, and build. To compare dimensions beforehand, check our [Kids Clothes Size Chart Guide](/blog/kids-clothing-size-chart-guide/). We will recommend the exact size, measuring the garments live with a tape if necessary.'
    );
  }
  if (!c.includes('/blog/video-call-shopping-kids-clothing/')) {
    c = c.replace(
      '2.  **Fabric Validation:** You can ask our staff to send close-up videos of the fabric, stretch, and stitching, giving you peace of mind before buying.',
      '2.  **Fabric Validation:** You can ask our staff to send close-up videos of the fabric, stretch, and stitching, giving you peace of mind before buying. Prefer a live face-to-face walkthrough? See our guide to [Video Call Shopping for Kids Clothing](/blog/video-call-shopping-kids-clothing/).'
    );
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('✅ Post 5 updated');
}

// Post 6: innerwear-basics-guide-cotton.mdx
{
  const p = 'src/content/blog/innerwear-basics-guide-cotton.mdx';
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('/shop/men/')) {
    c = c.replace(
      'While we are famous for children\'s wear, we also care for parents. We stock premium basics for men and women, focusing on 100% natural cotton:',
      'While we are famous for children\'s wear, we also care for parents. Browse our dedicated [Men\'s Cotton Loungewear & Basics](/shop/men/) and [Women\'s Muslin Sleepwear & Basics](/shop/women/) collections, focusing on 100% natural cotton:'
    );
  }
  if (!c.includes('/blog/boys-vs-girls-nightwear-fabrics/')) {
    c = c.replace(
      '- **Muslin & Cotton Night Suits:** Breathable sleep coordinates for comfort.',
      '- **Muslin & Cotton Night Suits:** Breathable sleep coordinates for comfort. Wondering how muslin compares to woven and knit cotton for sleeping comfort? Read our in-depth comparison on [Boys vs Girls Nightwear Fabrics](/blog/boys-vs-girls-nightwear-fabrics/).'
    );
  }
  if (!c.includes('/blog/newborn-clothing-essentials-mumbai/')) {
    c = c.replace(
      '- **Low GSM (100 - 130 GSM):** Extremely thin, lightweight fabric. Often used for basic undershirts or cheap disposable garments. Can wear out or tear quickly.',
      '- **Low GSM (100 - 130 GSM):** Extremely thin, lightweight fabric. For newborn babies with sensitive skin, lighter weights and open-weave muslins are essential; read our guide on [Newborn Clothing Essentials in Mumbai](/blog/newborn-clothing-essentials-mumbai/).'
    );
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('✅ Post 6 updated');
}

// Post 7: kemps-corner-shopping-guide.mdx
{
  const p = 'src/content/blog/kemps-corner-shopping-guide.mdx';
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace('/visit-us)', '/visit-us/)');
  if (!c.includes('/shop/')) {
    c = c.replace(
      'Nestled in the heart of the district, our store specializes in children\'s and family clothing.',
      'Nestled in the heart of the district, our store specializes in children\'s and family clothing. Browse our online [Children\'s Cotton Clothing Catalogue](/shop/) or stop by our counter near St. Stephen\'s Church.'
    );
  }
  if (!c.includes('/blog/how-to-buy-kids-clothes-whatsapp/')) {
    c = c.replace(
      '- **Why Visit:** We focus on natural, breathable fabrics and personalized service. If you are busy, we offer **free video shopping** and fast WhatsApp home delivery.',
      '- **Why Visit:** We focus on natural, breathable fabrics and personalized service. If you are short on time, see [how to buy kids clothes on WhatsApp](/blog/how-to-buy-kids-clothes-whatsapp/) with flat tape sizing and doorstep courier delivery. You can also read about our 30-year boutique story on [Our Heritage](/about/) page.'
    );
  }
  if (!c.includes('/blog/newborn-clothing-essentials-mumbai/')) {
    c = c.replace(
      '- **What We Stock:** High-quality cotton basics, newborn essentials, school uniforms, activewear, and daily essentials for kids (0-16Y) as well as basic wear for men and women.',
      '- **What We Stock:** High-quality cotton basics, newborn essentials, school uniforms, activewear, and daily essentials for kids (0-16Y). Expecting a baby or shopping for baby gifts? Review our essential checklist on [Newborn Clothing Essentials in Mumbai](/blog/newborn-clothing-essentials-mumbai/).'
    );
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('✅ Post 7 updated');
}

// Post 8: kids-clothing-size-chart-guide.mdx
{
  const p = 'src/content/blog/kids-clothing-size-chart-guide.mdx';
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace('/how-it-works)', '/how-it-works/)');
  if (!c.includes('/shop/newborn/')) {
    c = c.replace(
      '- **Baby (0 - 24 Months):** Sized by months (e.g., 0-3M, 3-6M, 6-12M, 12-18M, 18-24M). Sizing is based primarily on weight and height.',
      '- **Baby (0 - 24 Months):** Sized by months (e.g., 0-3M, 3-6M, 6-12M, 12-18M, 18-24M). Sizing is based primarily on weight and height. Shopping for an infant? Browse our [Newborn & Infant Clothes (0-24 Months)](/shop/newborn/) designed with extra diaper rise.'
    );
  }
  if (!c.includes('/shop/boys/')) {
    c = c.replace(
      '- **Big Kids / Youth (8 - 16 Years):** Sized by height, chest, and waist. Fits become more structured.',
      '- **Big Kids / Youth (8 - 16 Years):** Sized by height, chest, and waist. Fits become more structured. Explore our [Boys Playwear & Clothes](/shop/boys/) and [Girls Dresses & Sleepwear](/shop/girls/) collections.'
    );
  }
  if (!c.includes('/blog/boys-vs-girls-nightwear-fabrics/')) {
    c = c.replace(
      '- **100% Cotton & Muslin:** Natural fabrics can shrink slightly (about 3-5%) during the first few washes. Factor this in when buying.',
      '- **100% Cotton & Muslin:** Natural fabrics can shrink slightly (about 3-5%) during the first few washes. To understand how different cotton weaves behave over time, compare options in our [Boys vs Girls Nightwear Fabrics Guide](/blog/boys-vs-girls-nightwear-fabrics/).'
    );
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('✅ Post 8 updated');
}

// Post 9: kids-winterwear-guide-mumbai.mdx
{
  const p = 'src/content/blog/kids-winterwear-guide-mumbai.mdx';
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('/shop/boys/')) {
    c = c.replace(
      'Our jackets, hoodies, and full-length joggers are made of high-quality cotton fabrics that offer warmth without bulk.',
      'Our jackets, hoodies, and full-length joggers are made of high-quality cotton fabrics that offer warmth without bulk. Explore our [Boys Playwear & Clothes](/shop/boys/) and [Girls Dresses & Sleepwear](/shop/girls/) collections for warm-layer coordinates and full-length track pants.'
    );
  }
  if (!c.includes('/blog/best-sportswear-kids-guide/')) {
    c = c.replace(
      '- **Dryfit Jackets:** Lightweight, sporty, and perfect for morning sports practice.',
      '- **Dryfit Jackets:** Lightweight, sporty, and perfect for morning sports practice. If your child trains early mornings at Oval or Shivaji Park maidaans, consult our guide to the [Best Sportswear for Kids: Dryfit & Cricket Whites](/blog/best-sportswear-kids-guide/).'
    );
  }
  if (!c.includes('/blog/innerwear-basics-guide-cotton/')) {
    c = c.replace(
      'Your child’s base layer should always be 100% cotton. Cotton absorbs moisture and keeps the skin dry. A soft cotton t-shirt or a light tank top is perfect.',
      'Your child’s base layer should always be 100% cotton. Cotton absorbs moisture and keeps the skin dry. For breathable undershirts and daily camisoles, check out our [Innerwear & Basics Guide for Cotton Fabrics](/blog/innerwear-basics-guide-cotton/) or verify size dimensions with our [Kids Clothes Size Chart Guide](/blog/kids-clothing-size-chart-guide/).'
    );
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('✅ Post 9 updated');
}

// Post 10: newborn-clothing-essentials-mumbai.mdx
{
  const p = 'src/content/blog/newborn-clothing-essentials-mumbai.mdx';
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('/shop/newborn/')) {
    c = c.replace(
      'At **Warden & Sons Kids Wear**, we hand-pick every item in our newborn catalog.',
      'At **Warden & Sons Kids Wear**, we hand-pick every item in our newborn catalog. Explore our [Newborn & Infant Clothes (0-24 Months)](/shop/newborn/) department to select pure cotton jhablas, onesies, and swaddles.'
    );
  }
  if (!c.includes('/blog/baby-swaddling-blankets-bathrobes/')) {
    c = c.replace(
      'Swaddling mimics the safety of the womb and helps prevent the startle reflex from waking your baby. Muslin wraps are ideal for Mumbai because they prevent overheating.',
      'Swaddling mimics the safety of the womb and helps prevent the startle reflex from waking your baby. For step-by-step swaddling techniques and choosing between wraps, hooded towels, and bathrobes, read our detailed guide on [Baby Swaddling: Blankets, Wraps & Bathrobes Explained](/blog/baby-swaddling-blankets-bathrobes/). Muslin wraps are ideal for Mumbai because they prevent overheating.'
    );
  }
  if (!c.includes('/blog/kids-clothing-size-chart-guide/')) {
    c = c.replace(
      'As your baby begins to sit, crawl, and eventually take their first steps, their clothing needs transition from sleepwear to playwear.',
      'As your baby begins to sit, crawl, and eventually take their first steps, their clothing needs transition from sleepwear to playwear. Unsure about weight brackets or when to jump to toddler sizing? Consult our [Kids Clothes Size Chart Guide](/blog/kids-clothing-size-chart-guide/) or learn [how to buy kids clothes on WhatsApp](/blog/how-to-buy-kids-clothes-whatsapp/).'
    );
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('✅ Post 10 updated');
}

// Post 11: school-uniform-bulk-clothing-mumbai.mdx
{
  const p = 'src/content/blog/school-uniform-bulk-clothing-mumbai.mdx';
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace('/bulk-orders)', '/bulk-orders/)');
  if (!c.includes('/shop/boys/')) {
    c = c.replace(
      'From cricket whites for academies to football jerseys and dry-fit P.E. shorts, we manufacture durable sportswear that handles rough play.',
      'From cricket whites for academies to football jerseys and dry-fit P.E. shorts, we manufacture durable sportswear that handles rough play. For individual academy gear, explore our [Boys Playwear & Clothes](/shop/boys/) collection for in-stock cricket whites and workout shorts.'
    );
  }
  if (!c.includes('/blog/custom-matching-family-outfits-festivals/')) {
    c = c.replace(
      'Planning a community sports day at Malabar Hill or a festival gathering? We supply custom printed or embroidered cotton t-shirts in all sizes (from infants to adults) to match your theme.',
      'Planning a community sports day at Malabar Hill or a festival gathering? See our guide to [Custom Matching Family Outfits for Festivals & Events](/blog/custom-matching-family-outfits-festivals/). We supply custom printed or embroidered cotton t-shirts in all sizes (from infants to adults) to match your theme.'
    );
  }
  if (!c.includes('/blog/best-sportswear-kids-guide/')) {
    c = c.replace(
      '- **For Sports (P.E. Uniforms):** Go with **dry-fit microfiber**. It wicks sweat away from the body, drying rapidly in Mumbai\'s humid climate.',
      '- **For Sports (P.E. Uniforms):** Go with **dry-fit microfiber**. It wicks sweat away from the body, drying rapidly in Mumbai\'s humid climate. Compare performance fabrics in our [Best Sportswear for Kids: Dryfit & Cricket Whites Guide](/blog/best-sportswear-kids-guide/).'
    );
  }
  if (!c.includes('/visit-us/')) {
    c = c.replace(
      '- **In-Person Consultations:** Visit our Kemps Corner store to browse our fabric catalogs and sample racks.',
      '- **In-Person Consultations:** Visit our [Kemps Corner boutique](/visit-us/) to browse our fabric catalogs and sample racks.'
    );
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('✅ Post 11 updated');
}

// Post 12: video-call-shopping-kids-clothing.mdx
{
  const p = 'src/content/blog/video-call-shopping-kids-clothing.mdx';
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace('/how-it-works)', '/how-it-works/)');
  c = c.replace('/how-it-works)', '/how-it-works/)');
  if (!c.includes('/shop/')) {
    c = c.replace(
      '2.  **Specify Categories:** Let us know what you need',
      'Browse our digital [Children\'s Cotton Clothing Catalogue](/shop/) beforehand to add pieces to your Request List.\n2.  **Specify Categories:** Let us know what you need'
    );
  }
  if (!c.includes('/blog/how-to-buy-kids-clothes-whatsapp/')) {
    c = c.replace(
      'During a video call, our store assistant acts as your eyes and hands.',
      'During a video call, our store assistant acts as your eyes and hands. For a step-by-step overview of how we process live inquiries, see our guide on [How to Buy Kids\' Clothes on WhatsApp](/blog/how-to-buy-kids-clothes-whatsapp/).'
    );
  }
  if (!c.includes('/blog/kemps-corner-shopping-guide/')) {
    c = c.replace(
      'Why spend your precious free time stuck in South Bombay traffic? Bring our Kemps Corner store directly to your screen.',
      'Why spend your precious free time stuck in South Bombay traffic? Bring our Kemps Corner store directly to your screen. Visiting South Bombay in person? Check our [Kemps Corner Shopping Guide](/blog/kemps-corner-shopping-guide/) or get directions on our [Visit Us](/visit-us/) page.'
    );
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('✅ Post 12 updated');
}

console.log('All 12 blog posts successfully updated!');
