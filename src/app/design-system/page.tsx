import type { Metadata } from 'next';
import {
  Container,
  Button,
  Chip,
  Marker,
  SectionHeading,
  Photo,
} from '@/components/ui';
import {
  IconSearch,
  IconList,
  IconMenu,
  IconClose,
  IconWhatsApp,
  IconPhone,
  IconPin,
  IconPlus,
  IconMinus,
  IconCheck,
  IconChevron,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'Design System Primitives | Warden & Sons (Internal)',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemPage() {
  const tokens = [
    { name: '--ivory', hex: '#FBF7F0', desc: 'Page background', textDark: true },
    { name: '--paper', hex: '#F3EDE2', desc: 'Surfaces / Cards', textDark: true },
    { name: '--line', hex: '#E3DAC9', desc: '1px hairlines', textDark: true },
    { name: '--ink', hex: '#16233F', desc: 'Primary text / Primary CTA', textDark: false },
    { name: '--ink-soft', hex: '#4A5470', desc: 'Secondary text', textDark: false },
    { name: '--blue', hex: '#2F5FA7', desc: 'Focus ring / Accents', textDark: false },
    { name: '--red', hex: '#D8402F', desc: 'Marker accent', textDark: false },
    { name: '--yellow', hex: '#F1B434', desc: 'Marker accent', textDark: true },
    { name: '--wa', hex: '#0F7B4F', desc: 'WhatsApp send button', textDark: false },
  ];

  const icons = [
    { name: 'search', component: <IconSearch /> },
    { name: 'list', component: <IconList /> },
    { name: 'menu', component: <IconMenu /> },
    { name: 'close', component: <IconClose /> },
    { name: 'whatsapp', component: <IconWhatsApp /> },
    { name: 'phone', component: <IconPhone /> },
    { name: 'pin', component: <IconPin /> },
    { name: 'plus', component: <IconPlus /> },
    { name: 'minus', component: <IconMinus /> },
    { name: 'check', component: <IconCheck /> },
    { name: 'chevron', component: <IconChevron direction="down" /> },
  ];

  return (
    <div className="py-12 bg-[var(--ivory)] min-h-screen">
      <Container className="space-y-16">
        {/* Header Notice */}
        <div className="border-b border-[var(--line)] pb-6">
          <div className="flex items-center gap-2 label-upper text-[var(--ink-soft)] mb-2">
            <Marker color="blue" />
            <span>Step R1 · Internal Review Only</span>
          </div>
          <h1 className="h1 text-[var(--ink)]">Design System Primitives</h1>
          <p className="text-[var(--ink-soft)] mt-2">
            Tokens, fonts, WCAG AA contrast, 11 inline icons, and UI primitives for Warden & Sons.
          </p>
        </div>

        {/* 1. Colours & Tokens */}
        <section className="space-y-6">
          <SectionHeading
            title="1. Colour Tokens"
            kicker="Palette"
            markerIndex={0}
            description="Verified against WCAG AA standards (all text pairs >= 4.5:1 contrast)."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {tokens.map((token) => (
              <div
                key={token.name}
                className="p-4 rounded-[6px] border border-[var(--line)] flex flex-col justify-between h-32 shadow-xs transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: token.hex }}
              >
                <div className={token.textDark ? 'text-[var(--ink)]' : 'text-white'}>
                  <p className="font-semibold text-sm">{token.name}</p>
                  <p className="text-xs opacity-80">{token.hex}</p>
                </div>
                <p
                  className={`text-xs ${
                    token.textDark ? 'text-[var(--ink-soft)]' : 'text-white/80'
                  }`}
                >
                  {token.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Typography Scale */}
        <section className="space-y-6">
          <SectionHeading
            title="2. Typography Scale"
            kicker="Typography"
            markerIndex={1}
            description="Fraunces (500, 600) for headings + DM Sans (400, 500, 700) for body and controls."
          />
          <div className="space-y-6 p-6 rounded-[6px] border border-[var(--line)] bg-[var(--paper)]">
            <div>
              <p className="label-upper text-[var(--ink-soft)] mb-1">H1 · Fraunces clamp(34px, 8vw, 56px)</p>
              <h1 className="h1 text-[var(--ink)]">Everyday Cotton & Essentials</h1>
            </div>
            <div>
              <p className="label-upper text-[var(--ink-soft)] mb-1">H2 · Fraunces clamp(24px, 5vw, 36px)</p>
              <h2 className="h2 text-[var(--ink)]">Boys 2-16 Years · Nightwear & Basics</h2>
            </div>
            <div>
              <p className="label-upper text-[var(--ink-soft)] mb-1">H3 · Fraunces clamp(20px, 4vw, 26px)</p>
              <h3 className="h3 text-[var(--ink)]">Newborn Jhablas & Swaddle Sets</h3>
            </div>
            <div>
              <p className="label-upper text-[var(--ink-soft)] mb-1">Body · DM Sans 16px (1rem)</p>
              <p className="text-[var(--ink)] max-w-2xl">
                Since 1994, Warden & Sons has provided South Mumbai families with pure cotton newborn sets,
                breathable playwear, and bespoke school uniforms from Kemps Corner.
              </p>
            </div>
            <div>
              <p className="label-upper text-[var(--ink-soft)] mb-1">Uppercase Label · DM Sans 12px / 0.08em</p>
              <p className="label-upper text-[var(--ink-soft)]">
                SHOP 7 · HAJI HABIB BUILDING · KEMPS CORNER · OPEN DAILY 9AM-9PM
              </p>
            </div>
          </div>
        </section>

        {/* 3. Button Variants */}
        <section className="space-y-6">
          <SectionHeading
            title="3. Button Variants"
            kicker="Interactive"
            markerIndex={2}
            description="48px height, 4px radius, rectangular. Primary, WhatsApp, Secondary, Link."
          />
          <div className="flex flex-wrap items-center gap-4 p-6 rounded-[6px] border border-[var(--line)] bg-[var(--paper)]">
            <Button variant="primary">Primary (Ink)</Button>
            <Button variant="whatsapp">
              <span className="flex items-center gap-2">
                <IconWhatsApp size={20} />
                <span>Send list on WhatsApp</span>
              </span>
            </Button>
            <Button variant="secondary">Secondary (Outlined)</Button>
            <Button variant="link">Link Variant</Button>
            <Button variant="primary" disabled>
              Disabled State
            </Button>
          </div>
        </section>

        {/* 4. Chips & Markers */}
        <section className="space-y-6">
          <SectionHeading
            title="4. Chips & Category Markers"
            kicker="Controls"
            markerIndex={0}
            description="Selectable chips with aria-pressed. 8x8 square markers in rotation (red, blue, yellow)."
          />
          <div className="p-6 rounded-[6px] border border-[var(--line)] bg-[var(--paper)] space-y-6">
            <div>
              <p className="label-upper text-[var(--ink-soft)] mb-3">Age / Size Chips</p>
              <div className="flex flex-wrap gap-2">
                <Chip selected={false}>0-3M</Chip>
                <Chip selected={true}>3-6M (Selected)</Chip>
                <Chip selected={false}>6-12M</Chip>
                <Chip selected={false}>12-18M</Chip>
                <Chip selected={false}>Not sure</Chip>
                <Chip selected={false} disabled>
                  Out of stock
                </Chip>
              </div>
            </div>

            <div>
              <p className="label-upper text-[var(--ink-soft)] mb-3">8x8 Marker Squares</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Marker color="red" />
                  <span className="text-sm font-medium">Red Marker</span>
                </div>
                <div className="flex items-center gap-2">
                  <Marker color="blue" />
                  <span className="text-sm font-medium">Blue Marker</span>
                </div>
                <div className="flex items-center gap-2">
                  <Marker color="yellow" />
                  <span className="text-sm font-medium">Yellow Marker</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Photo Primitive */}
        <section className="space-y-6">
          <SectionHeading
            title="5. Photo Component"
            kicker="Media"
            markerIndex={1}
            description="4:5 aspect ratio by default. Image with async decoding vs calm placeholder tile when src is missing."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-[6px] border border-[var(--line)] bg-[var(--paper)]">
            <div>
              <p className="label-upper text-[var(--ink-soft)] mb-2">Photo with src (/hero-editorial.webp)</p>
              <div className="max-w-[260px]">
                <Photo
                  src="/hero-editorial.webp"
                  alt="Warden & Sons storefront editorial photography"
                  ratio="4/5"
                />
              </div>
            </div>
            <div>
              <p className="label-upper text-[var(--ink-soft)] mb-2">Photo without src (Calm placeholder)</p>
              <div className="max-w-[260px]">
                <Photo
                  src={null}
                  alt="Swaddles & Blankets"
                  placeholderLabel="Swaddles & Blankets"
                  ratio="4/5"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Inline SVG Icons */}
        <section className="space-y-6">
          <SectionHeading
            title="6. Inline SVG Icons (11 total)"
            kicker="Iconography"
            markerIndex={2}
            description="24px viewBox, 1.5px stroke, currentColor, aria-hidden by default."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6 rounded-[6px] border border-[var(--line)] bg-[var(--paper)]">
            {icons.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center justify-center p-4 rounded-[6px] border border-[var(--line)] bg-[var(--ivory)] gap-2"
              >
                <div className="text-[var(--ink)]">{item.component}</div>
                <span className="text-xs text-[var(--ink-soft)] font-mono">{item.name}</span>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
