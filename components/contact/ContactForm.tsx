'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';

export default function ContactForm() {
  const { t } = useI18n();
  const contact = t.pages.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    channel: '',
    subject: 'Feedback',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const subjectLine = `[Creovly ${formData.subject}] from ${formData.name || 'Creator'}${formData.channel ? ` (${formData.channel})` : ''}`;
  const bodyText = `Hi Creovly Support Team,\n\nName: ${formData.name}\nEmail: ${formData.email}\nChannel: ${formData.channel || 'N/A'}\nTopic: ${formData.subject}\n\nMessage:\n${formData.message}\n\n---\nSent via creovly.com/contact`;
  const mailtoUrl = `mailto:support@creovly.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyText)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validations
    if (!formData.name.trim()) {
      setErrorMsg(contact.errors.nameRequired);
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg(contact.errors.emailValid);
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMsg(contact.errors.messageMin);
      return;
    }

    // Direct client dispatch to user's mail client (zero local storage, zero web database)
    try {
      window.location.href = mailtoUrl;
    } catch (_) {
      // In case browser blocks navigation, the submitted state provides a direct link
    }

    setStatus('submitted');
  };

  const handleCopy = () => {
    const textToCopy = `To: support@creovly.com\nSubject: ${subjectLine}\n\n${bodyText}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  if (status === 'submitted') {
    return (
      <div className="p-8 sm:p-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center space-y-5 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center font-bold text-xl">
          ✉
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[var(--text-ink)]">
            {contact.form.submittedHeading}
          </h3>
          <p className="text-sm text-[var(--text-body)] max-w-lg mx-auto leading-relaxed">
            {contact.form.submittedBody}{' '}
            <strong className="text-[var(--text-ink)]">support@creovly.com</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={mailtoUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[var(--brand-accent)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            {contact.form.launchEmailApp}
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-xs font-semibold text-[var(--text-ink)] hover:bg-[var(--bg-canvas-subtle)] transition-colors"
          >
            {copied ? contact.form.copiedNotification : contact.form.buttonCopy}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-semibold text-[var(--text-ink)]">
            {contact.form.nameLabel} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={contact.form.namePlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas)] text-xs text-[var(--text-ink)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-semibold text-[var(--text-ink)]">
            {contact.form.emailLabel} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={contact.form.emailPlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas)] text-xs text-[var(--text-ink)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="channel" className="block text-xs font-semibold text-[var(--text-ink)]">
            {contact.form.channelLabel}
          </label>
          <input
            type="text"
            id="channel"
            name="channel"
            value={formData.channel}
            onChange={handleChange}
            placeholder={contact.form.channelPlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas)] text-xs text-[var(--text-ink)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="subject" className="block text-xs font-semibold text-[var(--text-ink)]">
            {contact.form.topicLabel}
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas)] text-xs text-[var(--text-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] transition-all cursor-pointer"
          >
            <option value="Feedback">{contact.form.topics.feedback}</option>
            <option value="Bug">{contact.form.topics.bug}</option>
            <option value="Feature">{contact.form.topics.feature}</option>
            <option value="Partnership">{contact.form.topics.partnership}</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-semibold text-[var(--text-ink)]">
          {contact.form.messageLabel} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder={contact.form.messagePlaceholder}
          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas)] text-xs text-[var(--text-ink)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] transition-all leading-relaxed"
        />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Button type="submit" variant="primary" size="md">
          {contact.form.buttonSubmit} &rarr;
        </Button>
        <span className="text-[11px] text-[var(--text-muted)]">
          {contact.form.privacyNote}
        </span>
      </div>
    </form>
  );
}
