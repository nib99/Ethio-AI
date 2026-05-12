import { supabase } from '@/lib/db/supabase';

export const leadService = {
  async createLead(businessId: string, leadData: any) {
    return await supabase
      .from('leads')
      .insert({ ...leadData, business_id: businessId });
  }
};
