import React from 'react';
import { Shield } from 'lucide-react';
import { SEO } from '../components/SEO';

const SECTIONS = [
  {
    title: 'Information We Collect',
    body: `When you create an account, we collect your full name, school email address, grade level, and the access code issued by a club officer. We also collect information you voluntarily provide, such as competition interests, team memberships, and skills listed on your profile.`,
  },
  {
    title: 'How We Use Your Information',
    body: `We use the information we collect solely to manage LEHS TSA membership, coordinate competition teams, communicate club announcements, and display your profile in the member directory. We do not use your information for advertising or any commercial purpose.`,
  },
  {
    title: 'Age Requirement — COPPA Compliance',
    body: `This website is intended for students who are at least 13 years of age. In compliance with the Children's Online Privacy Protection Act (COPPA), we do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child under 13 has registered, please contact us immediately at lehstsa@gmail.com and we will promptly delete the account and all associated data.`,
  },
  {
    title: 'Data Sharing',
    body: `We do not sell, trade, or transfer your personal information to outside parties. Your data is accessible only to LEHS TSA officers for chapter management purposes. Your name and skills may be visible to other registered members in the member directory.`,
  },
  {
    title: 'Data Storage & Security',
    body: `Your data is stored using Google Firebase, which employs industry-standard security measures including encryption in transit and at rest. We retain your information for as long as your account is active. To request account deletion, contact an officer or email lehstsa@gmail.com.`,
  },
  {
    title: 'Newsletter & Email Updates',
    body: `If you subscribe to our mailing list, we store your email address to send club updates. Subscribers must be 13 years of age or older. You may unsubscribe at any time by contacting us at lehstsa@gmail.com.`,
  },
  {
    title: 'Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last Updated" date. Continued use of the website after changes are posted constitutes acceptance of the updated policy.`,
  },
  {
    title: 'Contact Us',
    body: `If you have any questions about this Privacy Policy or your personal data, please contact us at lehstsa@gmail.com or through the Contact page on this website.`,
  },
];

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen animate-fade-in pb-24">
      <SEO title="Privacy Policy" description="LEHS TSA Privacy Policy — how we collect, use, and protect your information." />

      {/* Hero */}
      <div className="bg-electric-500/5 border-b border-space-500/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-electric-500/10 flex items-center justify-center text-electric-400 border border-electric-500/20">
              <Shield size={24} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold tracking-wider text-electric-400 uppercase bg-electric-500/10 rounded-full border border-electric-500/20">
              Legal
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-ink tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-ink-muted text-base">
            Last Updated: <span className="text-ink font-semibold">June 2025</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro */}
        <div className="bg-space-800 border border-electric-500/25 rounded-2xl p-6 mb-10">
          <p className="text-ink-dim leading-relaxed">
            Little Elm High School TSA ("LEHS TSA," "we," "our," or "us") operates this website to serve our chapter members. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information. By using this site, you agree to the practices described below.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {SECTIONS.map((section, i) => (
            <div key={i} className="bg-space-800/50 border border-space-500/40 rounded-2xl p-6">
              <h2 className="text-base font-black text-ink mb-3 flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
                  style={{ background: '#6a9bcc' }}
                >
                  {i + 1}
                </span>
                {section.title}
              </h2>
              <p className="text-ink-dim text-sm leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
