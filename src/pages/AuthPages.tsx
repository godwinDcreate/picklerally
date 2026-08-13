import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SkillLevel, GameFormat } from '../types';
import { Trophy, CheckCircle2, Lock, Mail, User, MapPin, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('alex.rivera@pickleball.io');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-lime-500 to-emerald-400 p-0.5 mx-auto shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Trophy className="w-6 h-6 text-lime-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white font-display">Welcome Back</h1>
          <p className="text-xs text-slate-500">Sign in to your PickleRally account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Password</label>
              <Link to="/forgot-password" className="text-[11px] text-lime-600 dark:text-lime-400 font-bold hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-lime-400 text-slate-950 font-extrabold text-sm shadow-md hover:bg-lime-300 transition-colors"
          >
            Sign In to Court
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-lime-600 dark:text-lime-400 font-extrabold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Austin, TX');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('Intermediate (3.5)');
  const [duprRating, setDuprRating] = useState<number>(3.5);
  const [preferredFormat, setPreferredFormat] = useState<GameFormat>('Doubles');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({
      name,
      email,
      location,
      skillLevel,
      duprRating,
      preferredFormat,
    });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-lime-500 to-emerald-400 p-0.5 mx-auto shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-lime-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white font-display">Create Player Account</h1>
          <p className="text-xs text-slate-500">Join the PickleRally player community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">DUPR Rating</label>
              <input
                type="number"
                step="0.05"
                min="2.0"
                max="6.0"
                value={duprRating}
                onChange={(e) => setDuprRating(parseFloat(e.target.value) || 3.5)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Skill Level</label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="Beginner (2.0-2.5)">Beginner (2.0-2.5)</option>
                <option value="Advanced Beginner (3.0)">Adv. Beginner (3.0)</option>
                <option value="Intermediate (3.5)">Intermediate (3.5)</option>
                <option value="Advanced (4.0-4.5)">Advanced (4.0-4.5)</option>
                <option value="Competitive (5.0+)">Competitive (5.0+)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Preferred Format</label>
              <select
                value={preferredFormat}
                onChange={(e) => setPreferredFormat(e.target.value as GameFormat)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="Doubles">Doubles</option>
                <option value="Singles">Singles</option>
                <option value="Open Play">Open Play</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 font-extrabold text-sm shadow-md hover:brightness-105 transition-all"
          >
            Create Player Profile & Play
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center">
          Already registered?{' '}
          <Link to="/login" className="text-lime-600 dark:text-lime-400 font-extrabold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-2xl space-y-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white font-display">Reset Password</h1>
        {submitted ? (
          <div className="space-y-3">
            <CheckCircle2 className="w-10 h-10 text-lime-400 mx-auto" />
            <p className="text-xs text-slate-300">
              Password reset link sent to <span className="font-bold text-white">{email}</span>. Please check your inbox.
            </p>
            <Link to="/login" className="inline-block px-4 py-2 rounded-xl bg-lime-400 text-slate-950 font-bold text-xs">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Account Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-xs"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
