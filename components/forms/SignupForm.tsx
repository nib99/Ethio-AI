// components/forms/SignupForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/db/supabase';

export default function SignupForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,

      options: {
        data: {
          full_name: fullName,
        },

        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Account created successfully. Please check your email.');
      router.push('/auth/login');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-ethiopian-green"
        required
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-ethiopian-green"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-ethiopian-green"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-ethiopian-green text-white py-3 rounded-lg font-medium hover:bg-green-800 transition"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="text-ethiopian-green font-medium hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
