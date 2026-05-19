import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - NetCloud Academy',
  description: 'Get in touch with NetCloud Academy. We\'d love to hear from you about your cloud computing and networking learning journey.',
  keywords: 'contact, NetCloud Academy, get in touch, support',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
