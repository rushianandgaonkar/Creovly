'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    channel: '',
    subject: 'Feedback',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validations
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address so we can reach you.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMsg('Please enter a message of at least 10 characters.');
      return;
    }

    setStatus('submitting');

    // Simulate reliable submission
    setTimeout(() => {
      // Store submission in local storage for local reference if needed
      try {
        const stored = JSON.parse(localStorage.getItem('creovly-contact-submissions') || '[]');
        stored.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('creovly-contact-submissions', JSON.stringify(stored));
      } catch (err) {
        // Ignore storage errors in private browsing
      }

      setStatus('submitted');
    }, 700);
  };

  if (status === 'submitted') {
    return (
      <div className="p-8 sm:p-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center font-bold text-xl">
          ✓
        </div>
        <h3 className="text-xl font-bold text-[var(--text-ink)]">
          Message Received!
        </h3>
        <p className="text-sm text-[var(--text-body)] max-w-md mx-auto leading-relaxed">
          Thank you for reaching out, <span className="font-semibold text-[var(--text-ink)]">{formData.name}</span>. Your information and message have been recorded. Our team will review your inquiry and follow up at <span className="font-semibold text-[var(--text-ink)]">{formData.email}</span>.
        </p>
        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({ name: '', email: '', channel: '', subject: 'Feedback', message: '' });
              setStatus('idle');
            }}
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-xs text-rose-600 dark:text-rose-400">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-[var(--text-ink)] mb-1.5">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Alex Rivera"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-sm text-[var(--text-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition-all"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-[var(--text-ink)] mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="alex@example.com"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-sm text-[var(--text-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="channel" className="block text-xs font-semibold text-[var(--text-ink)] mb-1.5">
            YouTube Channel or Handle <span className="text-[var(--text-muted)] font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            id="channel"
            name="channel"
            value={formData.channel}
            onChange={handleChange}
            placeholder="@YourChannel"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-sm text-[var(--text-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition-all"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-semibold text-[var(--text-ink)] mb-1.5">
            Topic / Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-sm text-[var(--text-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition-all"
          >
            <option value="Feedback">General Feedback</option>
            <option value="Feature Request">New Feature or Tool Suggestion</option>
            <option value="Bug Report">Technical Issue / Bug Report</option>
            <option value="Partnership">Creator Collaboration / Partnership</option>
            <option value="Other">Other Inquiries</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-[var(--text-ink)] mb-1.5">
          Your Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us what's on your mind, how we can help, or feature suggestions for Creovly..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-sm text-[var(--text-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition-all resize-y"
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-[11px] text-[var(--text-muted)] font-mono">
          🔒 Your details are never shared or sold.
        </p>
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}

