// app/auth/signup/page.tsx
'use client';

import SignupForm from '@/components/forms/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ethiopian-green">
            አካውንት ይፍጠሩ
          </h1>

          <p className="text-gray-600 mt-2">
            Create your EthioAI account
          </p>
        </div>

        <SignupForm />
      </div>
    </div>
  );
}
