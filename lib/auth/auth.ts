import { supabase } from '@/lib/db/supabase';

export async function createBusinessForUser(userId: string, businessName: string) {
  const { data: business } = await supabase
    .from('businesses')
    .insert({
      name: businessName,
      owner_id: userId,
      slug: businessName.toLowerCase().replace(/\s+/g, '-'),
    })
    .select()
    .single();

  await supabase
    .from('profiles')
    .update({ business_id: business.id })
    .eq('id', userId);

  return business;
}
