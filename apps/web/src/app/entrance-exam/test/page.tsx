'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Trophy,
  RotateCcw,
} from 'lucide-react';

interface Question {
  id: number;
  subject: 'Physics' | 'Chemistry' | 'Computer Science' | 'Mathematics' | 'English';
  question: string;
  options: string[];
  correctAnswer: number;
}

const EXAMINATION_QUESTIONS: Question[] = [
  {
    id: 1,
    subject: 'Computer Science',
    question: 'Which data structure follows the Last-In, First-Out (LIFO) principle?',
    options: ['Queue', 'Stack', 'Linked List', 'Array'],
    correctAnswer: 1,
  },
  {
    id: 2,
    subject: 'Physics',
    question: 'What is the SI unit of Electric Capacitance?',
    options: ['Ohm', 'Volt', 'Farad', 'Tesla'],
    correctAnswer: 2,
  },
  {
    id: 3,
    subject: 'Mathematics',
    question: 'What is the derivative of sin(x) with respect to x?',
    options: ['-cos(x)', 'cos(x)', 'tan(x)', 'sec^2(x)'],
    correctAnswer: 1,
  },
  {
    id: 4,
    subject: 'Chemistry',
    question: 'Which element has the highest electronegativity on the Pauling scale?',
    options: ['Oxygen', 'Chlorine', 'Fluorine', 'Nitrogen'],
    correctAnswer: 2,
  },
  {
    id: 5,
    subject: 'English',
    question: 'Select the correct synonym for the word "Meticulous":',
    options: ['Careless', 'Thorough', 'Lazy', 'Vague'],
    correctAnswer: 1,
  },
];

export default function OnlineEntranceTestPage() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(600); // 10 Minutes timer
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    totalQuestions: number;
    correctCount: number;
    percentage: number;
    meritRank: string;
    scholarshipOffer: string;
  } | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeftSeconds <= 0) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeftSeconds]);

  const handleSelectOption = (qId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitTest = () => {
    let correct = 0;
    EXAMINATION_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct += 1;
      }
    });

    const percentage = Math.round((correct / EXAMINATION_QUESTIONS.length) * 100);
    let meritRank = 'Rank #8 in Entrance Merit List';
    let scholarshipOffer = '25% Partial Merit Scholarship Qualified';

    if (percentage >= 80) {
      meritRank = 'Rank #2 in Merit List (Distinction)';
      scholarshipOffer = '100% Full Merit Tuition Scholarship Qualified';
    } else if (percentage >= 60) {
      meritRank = 'Rank #5 in Merit List';
      scholarshipOffer = '50% Half Merit Tuition Scholarship Qualified';
    }

    setScoreResult({
      totalQuestions: EXAMINATION_QUESTIONS.length,
      correctCount: correct,
      percentage,
      meritRank,
      scholarshipOffer,
    });
    setIsSubmitted(true);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = EXAMINATION_QUESTIONS[currentQIndex];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {/* Header Banner */}
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Nobel Multiple College CBT Entrance Engine
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-nobel-navy-900 heading-serif">
              Computer-Based Entrance Examination 2026
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              Simulated online entrance test evaluating Physics, Chemistry, Computer Science, Mathematics, and English skills.
            </p>
          </div>

          {!isSubmitted ? (
            /* Active Test Interface */
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8">
              {/* Top Navigation & Timer Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block">
                    Question {currentQIndex + 1} of {EXAMINATION_QUESTIONS.length}
                  </span>
                  <div className="text-base font-bold text-nobel-navy-900">
                    Subject: <span className="text-nobel-crimson">{currentQ.subject}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-900 text-amber-400 px-4 py-2 rounded-xl font-mono font-bold text-base shadow border border-slate-800">
                  <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span>{formatTime(timeLeftSeconds)}</span>
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 leading-snug">
                  {currentQIndex + 1}. {currentQ.question}
                </h2>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQ.id, idx)}
                      className={`w-full p-4 rounded-2xl border-2 text-left text-xs font-semibold transition flex items-center justify-between ${
                        selectedAnswers[currentQ.id] === idx
                          ? 'border-nobel-navy-900 bg-slate-900 text-white shadow-md'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>
                        <strong className="mr-2">{String.fromCharCode(65 + idx)}.</strong> {opt}
                      </span>
                      {selectedAnswers[currentQ.id] === idx && (
                        <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Navigation Buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((prev) => prev - 1)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 disabled:opacity-40 transition"
                >
                  ← Previous Question
                </button>

                {currentQIndex < EXAMINATION_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex((prev) => prev + 1)}
                    className="px-6 py-2.5 rounded-xl bg-nobel-navy-900 text-white font-bold text-xs hover:bg-nobel-navy-800 transition shadow flex items-center gap-1.5"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    className="px-8 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition shadow flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Submit Entrance Test Now
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Test Result Card */
            scoreResult && (
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow border border-amber-200">
                  <Trophy className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest block">
                    CBT Entrance Test Complete
                  </span>
                  <h2 className="text-3xl font-black text-nobel-navy-900 heading-serif">
                    Score: {scoreResult.percentage}% ({scoreResult.correctCount} / {scoreResult.totalQuestions} Correct)
                  </h2>
                  <div className="inline-block px-3.5 py-1 rounded-full bg-nobel-navy-950 text-amber-400 text-xs font-extrabold">
                    {scoreResult.meritRank}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 max-w-lg mx-auto text-left space-y-2 text-xs">
                  <div className="font-bold flex items-center gap-2 text-amber-900 text-sm">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Automated Merit Scholarship Tier Calculated
                  </div>
                  <p className="text-amber-800 leading-relaxed font-semibold">
                    {scoreResult.scholarshipOffer}
                  </p>
                  <p className="text-slate-600 pt-1">
                    Your entrance evaluation score has been recorded in the College Admin Verification Queue.
                  </p>
                </div>

                <div className="pt-4 flex justify-center gap-4">
                  <Link
                    href="/student-portal"
                    className="px-8 py-3.5 rounded-xl bg-nobel-navy-900 text-white font-bold text-xs hover:bg-nobel-navy-800 transition shadow flex items-center gap-2"
                  >
                    View Status & Admit Card in Student Portal →
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
