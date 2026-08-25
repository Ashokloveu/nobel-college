'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  CheckCircle2,
  X,
  Lock,
  Smartphone,
  ShieldCheck,
  Building2,
  Printer,
  Download,
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amountNPR: number;
  applicantName: string;
  refCode: string;
  onPaymentSuccess?: (txnId: string) => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  title,
  amountNPR,
  applicantName,
  refCode,
  onPaymentSuccess,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'ESEWA' | 'KHALTI' | 'CONNECT_IPS'>('ESEWA');
  const [paymentStep, setPaymentStep] = useState<'SELECT' | 'PROCESSING' | 'SUCCESS'>('SELECT');
  const [txnId, setTxnId] = useState('');

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setPaymentStep('PROCESSING');
    setTimeout(() => {
      const generatedTxn = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      setTxnId(generatedTxn);
      setPaymentStep('SUCCESS');
      if (onPaymentSuccess) {
        onPaymentSuccess(generatedTxn);
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {paymentStep === 'SELECT' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block">
                Official Nepalese Payment Gateway
              </span>
              <h3 className="text-2xl font-black text-nobel-navy-900 heading-serif">
                {title}
              </h3>
              <p className="text-xs text-slate-500">
                Candidate: <strong className="text-slate-900">{applicantName}</strong> ({refCode})
              </p>
            </div>

            {/* Payable Amount Box */}
            <div className="bg-nobel-navy-950 text-white p-5 rounded-2xl flex items-center justify-between shadow">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Fee Payable</span>
                <span className="text-xs text-amber-400 font-bold">Inclusive of all Nepal Govt Taxes</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-amber-400">NPR {amountNPR.toLocaleString()}</span>
              </div>
            </div>

            {/* Select Gateway Method */}
            <div className="space-y-3">
              <label className="block font-bold uppercase text-slate-700 text-xs">
                Select Nepalese Payment Method *
              </label>

              <div className="grid grid-cols-3 gap-3">
                {/* eSewa */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('ESEWA')}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition ${
                    paymentMethod === 'ESEWA'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                    e
                  </div>
                  <span className="text-xs font-bold">eSewa</span>
                </button>

                {/* Khalti */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('KHALTI')}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition ${
                    paymentMethod === 'KHALTI'
                      ? 'border-purple-600 bg-purple-50 text-purple-950 shadow-md font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black text-xs">
                    K
                  </div>
                  <span className="text-xs font-bold">Khalti</span>
                </button>

                {/* ConnectIPS */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CONNECT_IPS')}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition ${
                    paymentMethod === 'CONNECT_IPS'
                      ? 'border-blue-600 bg-blue-50 text-blue-950 shadow-md font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                    IPS
                  </div>
                  <span className="text-xs font-bold">connectIPS</span>
                </button>
              </div>
            </div>

            {/* QR Scan Simulation Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <QrCode className="w-12 h-12 text-slate-700 mx-auto" />
              <div className="text-xs font-bold text-slate-900">
                Scan QR Code with {paymentMethod === 'ESEWA' ? 'eSewa App' : paymentMethod === 'KHALTI' ? 'Khalti Wallet' : 'connectIPS Mobile App'}
              </div>
              <p className="text-[10px] text-slate-500">
                Official Merchant Account: <strong>Nobel Multiple College Bardibas</strong>
              </p>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleSimulatePayment}
              className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition shadow-lg flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-emerald-200" />
              Confirm & Pay NPR {amountNPR.toLocaleString()} via {paymentMethod}
            </button>
          </div>
        )}

        {paymentStep === 'PROCESSING' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-pulse">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-nobel-navy-900">
              Verifying Payment with {paymentMethod}...
            </h3>
            <p className="text-xs text-slate-500">
              Communicating securely with Banking Server in Nepal. Please wait...
            </p>
          </div>
        )}

        {paymentStep === 'SUCCESS' && (
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider block">
                Payment Verification Successful
              </span>
              <h3 className="text-2xl font-black text-nobel-navy-900">
                Transaction ID: {txnId}
              </h3>
              <p className="text-xs text-slate-600">
                Amount Paid: <strong className="text-slate-900">NPR {amountNPR.toLocaleString()}</strong> via {paymentMethod}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1 text-slate-700 font-mono">
              <div>Merchant: Nobel Multiple College, Bardibas</div>
              <div>Payer Name: {applicantName}</div>
              <div>Ref ID: {refCode}</div>
              <div>Status: PAID & INSTANTLY VERIFIED</div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition shadow flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                Print Payment Receipt
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition shadow"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
