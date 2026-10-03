import React from 'react';
import type { Metadata } from 'next';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact | Bibhav Pokharel',
  description:
    'Get in touch with Bibhav Pokharel for Full-Stack MERN, AI/ML, or Software Engineering opportunities.',
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20">
      <Contact />
    </div>
  );
}
