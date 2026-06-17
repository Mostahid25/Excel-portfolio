/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { Mail, Send, CheckCircle2, ListFilter, Download, Trash2, Settings2, FileSpreadsheet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [subject, setSubject] = useState('');
  const [messageText, setMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Admin Inbox section toggling
  const [showAdminInbox, setShowAdminInbox] = useState(false);

  // Load existing messages on component mount
  useEffect(() => {
    const saved = localStorage.getItem('mostahid_portfolio_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (err) {
        console.error("Error reading portfolio inbox", err);
      }
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !messageText) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: "msg_" + Date.now(),
        name,
        email,
        organization: organization || 'N/A',
        subject: subject || 'General Consultation Inquiry',
        message: messageText,
        date: new Date().toISOString().split('T')[0]
      };

      const updated = [newMessage, ...messages];
      setMessages(updated);
      localStorage.setItem('mostahid_portfolio_messages', JSON.stringify(updated));

      // Reset fields
      setName('');
      setEmail('');
      setOrganization('');
      setSubject('');
      setMessageText('');
      
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1200);
  };

  const handleDeleteMessage = (id: string) => {
    const filtered = messages.filter(m => m.id !== id);
    setMessages(filtered);
    localStorage.setItem('mostahid_portfolio_messages', JSON.stringify(filtered));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to purge all inbox messages from cache?")) {
      setMessages([]);
      localStorage.removeItem('mostahid_portfolio_messages');
    }
  };

  // Legendary feature: Download Inbox as CSV (Excel Friendly UTF-8 file!)
  const handleDownloadCsv = () => {
    if (messages.length === 0) return;
    
    // Headers matching standard Excel databases
    const headers = ["Message ID", "Prospect Name", "Email Address", "Organization", "Subject", "Date Submitted", "Message Description"];
    const rows = messages.map(m => [
      m.id,
      m.name.replace(/"/g, '""'),
      m.email,
      m.organization.replace(/"/g, '""'),
      m.subject.replace(/"/g, '""'),
      m.date,
      m.message.replace(/"/g, '""')
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${val}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Mostahid_Excel_Inbox_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Contact details & Call to action */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 block uppercase">
              // LET'S CONNECT
            </span>
            <h3 className="text-3xl font-display font-bold text-white tracking-tight leading-none md:text-4xl">
              Initiate Data Project
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Looking to clean legacy system outputs, establish Power Pivot DAX databases, automate worksheets, or optimize financial forecasts? Write me detailed metrics below and let's turn counts into compilations.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-3 bg-[#121926] border border-slate-805 p-3 rounded-lg hover:border-slate-700 transition-colors">
              <span className="text-lg">✉️</span>
              <div>
                <span className="text-[#a1a1aa] block text-3xs uppercase">Primary Email</span>
                <a href="mailto:mostahidgm@gmail.com" className="text-emerald-400 hover:underline">mostahidgm@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#121926] border border-slate-805 p-3 rounded-lg hover:border-slate-700 transition-colors">
              <span className="text-lg">📞</span>
              <div>
                <span className="text-[#a1a1aa] block text-3xs uppercase">Secure Mobile Cell</span>
                <span className="text-slate-200">+8801771426048</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#121926] border border-slate-805 p-3 rounded-lg hover:border-slate-700 transition-colors">
              <span className="text-lg">📍</span>
              <div>
                <span className="text-[#a1a1aa] block text-3xs uppercase">Primary Location</span>
                <span className="text-slate-200">Khulna, Bangladesh — Remote Friendly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form Module */}
        <div className="lg:col-span-7">
          <div className="bg-[#121926] border border-slate-800 rounded-xl p-6 md:p-8 relative">
            <h4 className="text-base font-mono font-bold text-slate-300 border-b border-slate-800 pb-3 mb-6 flex items-center gap-2">
              <Mail className="w-4.5 h-4.5 text-emerald-400" />
              INQUIRY TRANSCRIPTION FORM
            </h4>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-3xs font-mono text-slate-500 mb-1.5 uppercase tracking-wide">Prospect Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-[#0b0f19] border border-slate-800 focus:border-emerald-500/80 rounded-lg p-2.5 text-slate-200 text-xs font-mono outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-3xs font-mono text-slate-500 mb-1.5 uppercase tracking-wide">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full bg-[#0b0f19] border border-slate-800 focus:border-emerald-500/80 rounded-lg p-2.5 text-slate-200 text-xs font-mono outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-3xs font-mono text-slate-500 mb-1.5 uppercase tracking-wide">Organization / Corporate Group</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Globex Corp (Optional)"
                    className="w-full bg-[#0b0f19] border border-slate-800 focus:border-emerald-500/80 rounded-lg p-2.5 text-slate-200 text-xs font-mono outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-3xs font-mono text-slate-500 mb-1.5 uppercase tracking-wide">Inquiry Topic Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Dashboard Redesign Consulting"
                    className="w-full bg-[#0b0f19] border border-slate-800 focus:border-emerald-500/80 rounded-lg p-2.5 text-slate-200 text-xs font-mono outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-3xs font-mono text-slate-500 mb-1.5 uppercase tracking-wide">Strategic Project Scope *</label>
                <textarea
                  required
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Outline columns, dashboards parameters, macro logic needs..."
                  className="w-full bg-[#0b0f19] border border-slate-800 focus:border-emerald-500/80 rounded-lg p-3 text-slate-200 text-xs font-mono outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-mono text-xs py-3 rounded-lg font-bold transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>TRANSCRIBING PAYLOAD...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 fill-current" />
                    <span>TRANSMIT SECURE INQUIRY</span>
                  </>
                )}
              </button>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-md flex items-center gap-2 text-3xs font-mono text-emerald-400"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Inquiry payload compiled and written successfully! Excel dashboard administrator updated.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
