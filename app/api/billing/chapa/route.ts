import { NextRequest } from 'next/server';
import { supabase } from '@/lib/db/supabase';

export async function POST(req: NextRequest) {
  const { businessId, plan, amount } = await req.json();

  const tx_ref = `ethioai-${Date.now()}`;

  const payload = {
    amount,
    currency: "ETB",
    tx_ref,
    redirect_url: `${process.env.NEXTAUTH_URL}/dashboard/billing?success=true`,
    customization: {
      title: "EthioAI Subscription",
      description: `${plan} Plan`,
    },
  };

  const response = await fetch('https://api.chapa.co/v1/transaction/initialize', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.status === 'success') {
    await supabase.from('subscriptions').insert({
      business_id: businessId,
      plan,
      chapa_tx_ref: tx_ref,
      status: 'pending',
    });
  }

  return Response.json(data);
}
