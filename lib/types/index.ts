export type Business = {
  id: string;
  name: string;
  slug: string;
  primary_language: string;
  supported_languages: string[];
};

export type Conversation = {
  id: string;
  business_id: string;
  platform: 'telegram' | 'whatsapp' | 'web';
  platform_id: string;
  customer_name?: string;
  status: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
};

export type Lead = {
  id: string;
  business_id: string;
  name?: string;
  phone: string;
  email?: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  tags: string[];
};

export type Document = {
  id: string;
  filename: string;
  status: 'processing' | 'completed' | 'failed';
  created_at: string;
};
