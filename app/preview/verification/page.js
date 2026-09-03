'use client';
// DEV PREVIEW — photo verification modal, forced vs. voluntary.
// Not linked in the app; visit /preview/verification directly.

import { useState } from 'react';
import PhotoUploadModal from '@/components/ui/PhotoUploadModal';

const VARIANTS = [
  { key: 'forced', caption: 'Forced · missing', forced: true, reason: null },
  {
    key: 'forced-rejected',
    caption: 'Forced · rejected',
    forced: true,
    reason: 'Seja nav skaidri saskatāma. Lūdzu uzņem foto gaišākā vietā.',
  },
  { key: 'voluntary', caption: 'Voluntary (legacy)', forced: false, reason: null },
];

export default function VerificationPreview() {
  const [active, setActive] = useState(0);
  const variant = VARIANTS[active];

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[70] flex flex-wrap gap-2 bg-black/80 p-3 backdrop-blur">
        {VARIANTS.map((v, i) => (
          <button
            key={v.key}
            onClick={() => setActive(i)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              i === active ? 'bg-accent text-black' : 'bg-white/10 text-white'
            }`}
          >
            {v.caption}
          </button>
        ))}
      </div>

      <PhotoUploadModal
        key={variant.key}
        forced={variant.forced}
        rejectionReason={variant.reason}
        onClose={() => {}}
      />
    </>
  );
}
