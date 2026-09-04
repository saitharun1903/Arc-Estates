"use client";

import React, { useState } from "react";
import { Lock, Mail, ShieldCheck, ArrowRight, KeyRound } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@arcavenue.in");
  const [password, setPassword] = useState("arcavenue2025");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Successful login
      window.location.href = "/admin";
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCreds = () => {
    setEmail("admin@arcavenue.in");
    setPassword("arcavenue2025");
  };

  return (
    <div className="min-h-screen bg-[#0A0C0E] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#16191E] border border-[#C5A880] flex items-center justify-center mx-auto text-[#C5A880] font-serif font-bold text-xl shadow-lg">
            A
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wider">
            ARC AVENUE
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#8C8983]">
            Operations Console • Staff Portal
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="p-4 rounded-xl bg-[#14181F] border border-[#C5A880]/30 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[#C5A880] font-semibold flex items-center space-x-1">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Demo Access Credentials</span>
            </span>
            <button
              type="button"
              onClick={fillDemoCreds}
              className="text-[10px] text-[#C5A880] underline hover:text-white"
            >
              Fill Credentials
            </button>
          </div>
          <div className="font-mono text-[11px] text-[#CCC7BC] space-y-0.5">
            <div>Email: <strong className="text-white">admin@arcavenue.in</strong></div>
            <div>Password: <strong className="text-white">arcavenue2025</strong></div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-[#12151A] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-xs text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C8983] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@arcavenue.in"
                  className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8C8983] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#C5A880] hover:bg-[#B38F5B] disabled:opacity-50 text-[#0C0E10] text-xs font-bold uppercase tracking-widest rounded-lg transition-all shadow-xl flex items-center justify-center space-x-2"
            >
              <span>{loading ? "Verifying..." : "Sign In to Console"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center border-t border-white/5">
            <Link
              href="/"
              className="text-xs text-[#8C8983] hover:text-white transition-colors inline-flex items-center space-x-1"
            >
              <span>← Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
