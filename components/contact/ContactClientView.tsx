'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CONTACT_CHANNELS, ContactChannel } from './contactData';
import ContactHero from './ContactHero';
import ContactChannelsBento from './ContactChannelsBento';
import ContactFormSection from './ContactFormSection';
import ContactInfoStrip from './ContactInfoStrip';

function ContactInner() {
  const searchParams = useSearchParams();
  const channelParam = searchParams.get('channel') || 'sales';

  const [selectedChannelKey, setSelectedChannelKey] = useState<string>(
    CONTACT_CHANNELS.some((c) => c.key === channelParam) ? channelParam : 'sales'
  );

  useEffect(() => {
    const ch = searchParams.get('channel');
    if (ch && CONTACT_CHANNELS.some((c) => c.key === ch)) {
      setSelectedChannelKey(ch);
    }
  }, [searchParams]);

  const selectedChannel: ContactChannel =
    CONTACT_CHANNELS.find((c) => c.key === selectedChannelKey) || CONTACT_CHANNELS[0];

  return (
    <>
      {/* 1. Hero (60-70vh height, clean left-aligned heading, response signals, no card) */}
      <ContactHero />

      {/* 2. 8 Channels Bento Grid */}
      <ContactChannelsBento
        selectedChannelKey={selectedChannelKey}
        onSelectChannel={setSelectedChannelKey}
      />

      {/* 3. Direct Message Form */}
      <ContactFormSection
        selectedChannelKey={selectedChannelKey}
        onSelectChannel={setSelectedChannelKey}
      />

      {/* 4. Response Time, Office (Google Maps), and Socials */}
      <ContactInfoStrip />
    </>
  );
}

export default function ContactClientView() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center font-mono text-xs">Loading contact interface...</div>}>
      <ContactInner />
    </Suspense>
  );
}
