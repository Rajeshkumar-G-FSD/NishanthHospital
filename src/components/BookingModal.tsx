import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Mail, Phone, Heart, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { BookingRequest } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingRequest>({
    parentName: '',
    email: '',
    phone: '',
    dueDate: '',
    careType: 'maternity',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Quick validations
    if (!formData.parentName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter a target phone number.');
      return;
    }
    if (!formData.dueDate) {
      setErrorMsg('Please select your estimated due date.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API roundtrip
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      parentName: '',
      email: '',
      phone: '',
      dueDate: '',
      careType: 'maternity',
      notes: '',
    });
    setIsSuccess(false);
    setErrorMsg('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" id="booking-modal-overlay">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            id="booking-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* Top decorative header border */}
            <div className="h-2 bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              aria-label="Close modal"
              id="modal-close-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <div className="flex items-center space-x-2 text-rose-500 font-sans text-xs font-semibold uppercase tracking-wider mb-1">
                    <Heart className="w-4 h-4 fill-rose-100" />
                    <span>Schedule Free Consultation</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                    Your Companion in Motherhood
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Begin your parenting chapter with full confidence. Secure a dedicated birth plan tour today.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" id="consultation-form">
                  {errorMsg && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-sans font-semibold text-slate-600 uppercase tracking-wider mb-1.5 label-ref">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        placeholder="Sarah Jenkins"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-3 focus:ring-rose-500/10 text-slate-700 text-sm font-sans font-medium outline-hidden transition-all"
                        required
                        id="input-parent-name"
                      />
                    </div>
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans font-semibold text-slate-600 uppercase tracking-wider mb-1.5 label-ref">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="sarah@example.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-3 focus:ring-rose-500/10 text-slate-700 text-sm font-sans font-medium outline-hidden transition-all"
                          required
                          id="input-email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-semibold text-slate-600 uppercase tracking-wider mb-1.5 label-ref">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 019-2834"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-3 focus:ring-rose-500/10 text-slate-700 text-sm font-sans font-medium outline-hidden transition-all"
                          required
                          id="input-phone"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Due Date field */}
                    <div>
                      <label className="block text-xs font-sans font-semibold text-slate-600 uppercase tracking-wider mb-1.5 label-ref">
                        Estimated Due Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="date"
                          name="dueDate"
                          value={formData.dueDate}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-3 focus:ring-rose-500/10 text-slate-700 text-sm font-sans font-medium tracking-tight outline-hidden transition-all"
                          required
                          id="input-due-date"
                        />
                      </div>
                    </div>

                    {/* Care Type Selection */}
                    <div>
                      <label className="block text-xs font-sans font-semibold text-slate-600 uppercase tracking-wider mb-1.5 label-ref">
                        Primary Service Area
                      </label>
                      <select
                        name="careType"
                        value={formData.careType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-3 focus:ring-rose-500/10 text-slate-700 text-sm font-sans font-medium bg-white outline-hidden transition-all"
                        id="select-care-type"
                      >
                        <option value="maternity">Full Obstetric Maternity</option>
                        <option value="postnatal">Postnatal Care & Recovery</option>
                        <option value="doula">Holistic Doula Support</option>
                        <option value="midwife">Comprehensive Midwifery</option>
                      </select>
                    </div>
                  </div>

                  {/* Optional Notes */}
                  <div>
                    <label className="block text-xs font-sans font-semibold text-slate-600 uppercase tracking-wider mb-1.5 label-ref">
                      Special requests or notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Share any birth preferences or medical questions..."
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-3 focus:ring-rose-500/10 text-slate-700 text-sm font-sans font-medium outline-hidden transition-all resize-none"
                      id="input-notes"
                    />
                  </div>

                  {/* Submission Row */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-sans font-bold shadow-md shadow-rose-500/20 hover:opacity-95 transition-opacity disabled:opacity-50"
                      id="submit-booking-btn"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span>Schedule Secure Consultation</span>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Greeting State */
              <motion.div 
                id="booking-success-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-4 border border-emerald-100">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-slate-800 leading-tight">
                  All Scheduled, {formData.parentName.split(' ')[0]}!
                </h4>
                <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                  A verification confirmation email and secure intake instructions has been dispatched to 
                  <span className="font-semibold text-slate-700 block mt-1">{formData.email}</span>
                </p>

                {/* Consultation Details Ticket */}
                <div className="my-6 p-4 rounded-2xl bg-amber-50/50 border border-amber-100 text-left max-w-sm mx-auto">
                  <div className="flex items-center space-x-2 text-xs text-amber-800 font-semibold uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Intake Ticket Reservation</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="font-medium">Selected Program:</span>
                      <span className="font-semibold text-slate-800 uppercase text-[10px] tracking-wide bg-amber-100/60 px-2 py-0.5 rounded-full">
                        {formData.careType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Estimated Arrival:</span>
                      <span className="font-bold text-slate-800 font-mono text-xs">{formData.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Support Line Priority:</span>
                      <span className="font-bold text-emerald-700">Immediate Active Support</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 justify-center">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-sans font-medium hover:bg-slate-50 transition-colors"
                    id="success-close-btn"
                  >
                    Done
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-white text-sm font-sans font-semibold transition-all"
                    id="success-rebook-btn"
                  >
                    Reschedule Another
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
