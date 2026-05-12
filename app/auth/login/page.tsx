'use client';

import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ethiopian-green">እንኳን ደህና መጡ</h1>
          <p className="text-gray-600 mt-2">Sign in to your EthioAI Dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
