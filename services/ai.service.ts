import { supabase } from '@/lib/db/supabase';

export const aiService = {
  async getRelevantChunks(businessId: string, query: string, limit = 6) {
    const { data } = await supabase
      .from('knowledge_chunks')
      .select('content')
      .eq('business_id', businessId)
      .limit(limit);
    return data || [];
  }
};
