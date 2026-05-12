'use client';

import { useState } from 'react';

const plans = [
  { name: "Starter", price: 3000, desc: "Up to 500 conversations/month" },
  { name: "Business", price: 8000, desc: "Unlimited conversations + Priority support" },
  { name: "Enterprise", price: 0, desc: "Custom solution" },
];

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("Business");

  const handleSubscribe = async (plan: string, amount: number) => {
    const res = await fetch('/api/billing/chapa', {
      method: 'POST',
      body: JSON.stringify({ plan, amount, businessId: 'current' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (data.data?.checkout_url) {
      window.location.href = data.data.checkout_url;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">Choose Your Plan</h1>
      <p className="text-center text-gray-600 mb-12">Simple, transparent pricing built for Ethiopian businesses</p>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`border rounded-3xl p-8 ${plan.name === "Business" ? 'border-ethiopian-green scale-105 shadow-xl' : 'border-gray-200'}`}
          >
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <p className="text-5xl font-bold mt-6">
              {plan.price === 0 ? "Custom" : `${plan.price} ETB`}
              <span className="text-base font-normal text-gray-500">/month</span>
            </p>
            <p className="mt-8 text-gray-600">{plan.desc}</p>
            
            <button
              onClick={() => handleSubscribe(plan.name, plan.price)}
              className={`mt-10 w-full py-4 rounded-2xl font-medium ${
                plan.name === "Business" 
                  ? 'bg-ethiopian-green text-white' 
                  : 'border border-ethiopian-green text-ethiopian-green hover:bg-ethiopian-green hover:text-white'
              }`}
            >
              {plan.name === "Enterprise" ? "Contact Sales" : "Subscribe Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
