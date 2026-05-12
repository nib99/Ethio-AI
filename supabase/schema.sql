-- =====================================================
-- ETHIOAI BOT — FINAL HARDENED RLS
-- =====================================================

create extension if not exists "uuid-ossp";
create extension if not exists vector;

-- =====================================================
-- TEAM MEMBERS
-- =====================================================

create table if not exists business_members (
  id uuid primary key default uuid_generate_v4(),

  business_id uuid
    references businesses(id)
    on delete cascade
    not null,

  user_id uuid
    references auth.users(id)
    on delete cascade
    not null,

  role text
    default 'member'
    check (role in ('owner', 'admin', 'member')),

  created_at timestamptz default now(),

  unique (business_id, user_id)
);

-- =====================================================
-- ENABLE RLS
-- =====================================================

alter table profiles enable row level security;
alter table businesses enable row level security;
alter table business_members enable row level security;
alter table subscriptions enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table leads enable row level security;
alter table documents enable row level security;
alter table knowledge_chunks enable row level security;
alter table analytics enable row level security;
alter table agent_handoffs enable row level security;

-- =====================================================
-- HELPER FUNCTION
-- =====================================================

create or replace function user_has_business_access(target_business uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from businesses b
    left join business_members bm
      on bm.business_id = b.id
    where b.id = target_business
      and (
        b.owner_id = auth.uid()
        or bm.user_id = auth.uid()
      )
  );
$$;

-- =====================================================
-- PROFILES
-- =====================================================

create policy "profiles_select"
on profiles
for select
using (id = auth.uid());

create policy "profiles_insert"
on profiles
for insert
with check (id = auth.uid());

create policy "profiles_update"
on profiles
for update
using (id = auth.uid());

create policy "profiles_delete"
on profiles
for delete
using (id = auth.uid());

-- =====================================================
-- BUSINESSES
-- =====================================================

create policy "businesses_select"
on businesses
for select
using (user_has_business_access(id));

create policy "businesses_insert"
on businesses
for insert
with check (owner_id = auth.uid());

create policy "businesses_update"
on businesses
for update
using (owner_id = auth.uid());

create policy "businesses_delete"
on businesses
for delete
using (owner_id = auth.uid());

-- =====================================================
-- BUSINESS MEMBERS
-- =====================================================

create policy "business_members_select"
on business_members
for select
using (
  user_has_business_access(business_id)
);

create policy "business_members_insert"
on business_members
for insert
with check (
  exists (
    select 1
    from businesses
    where id = business_members.business_id
      and owner_id = auth.uid()
  )
);

create policy "business_members_update"
on business_members
for update
using (
  exists (
    select 1
    from businesses
    where id = business_members.business_id
      and owner_id = auth.uid()
  )
);

create policy "business_members_delete"
on business_members
for delete
using (
  exists (
    select 1
    from businesses
    where id = business_members.business_id
      and owner_id = auth.uid()
  )
);

-- =====================================================
-- CONVERSATIONS
-- =====================================================

create policy "conversations_select"
on conversations
for select
using (
  user_has_business_access(business_id)
);

create policy "conversations_insert"
on conversations
for insert
with check (
  user_has_business_access(business_id)
);

create policy "conversations_update"
on conversations
for update
using (
  user_has_business_access(business_id)
);

create policy "conversations_delete"
on conversations
for delete
using (
  user_has_business_access(business_id)
);

-- =====================================================
-- LEADS
-- =====================================================

create policy "leads_select"
on leads
for select
using (
  user_has_business_access(business_id)
);

create policy "leads_insert"
on leads
for insert
with check (
  user_has_business_access(business_id)
);

create policy "leads_update"
on leads
for update
using (
  user_has_business_access(business_id)
);

create policy "leads_delete"
on leads
for delete
using (
  user_has_business_access(business_id)
);

-- =====================================================
-- DOCUMENTS
-- =====================================================

create policy "documents_select"
on documents
for select
using (
  user_has_business_access(business_id)
);

create policy "documents_insert"
on documents
for insert
with check (
  user_has_business_access(business_id)
);

create policy "documents_update"
on documents
for update
using (
  user_has_business_access(business_id)
);

create policy "documents_delete"
on documents
for delete
using (
  user_has_business_access(business_id)
);

-- =====================================================
-- KNOWLEDGE CHUNKS
-- =====================================================

create policy "knowledge_chunks_select"
on knowledge_chunks
for select
using (
  user_has_business_access(business_id)
);

create policy "knowledge_chunks_insert"
on knowledge_chunks
for insert
with check (
  user_has_business_access(business_id)
);

create policy "knowledge_chunks_update"
on knowledge_chunks
for update
using (
  user_has_business_access(business_id)
);

create policy "knowledge_chunks_delete"
on knowledge_chunks
for delete
using (
  user_has_business_access(business_id)
);

-- =====================================================
-- ANALYTICS
-- =====================================================

create policy "analytics_select"
on analytics
for select
using (
  user_has_business_access(business_id)
);

-- =====================================================
-- AGENT HANDOFFS
-- =====================================================

create policy "handoffs_select"
on agent_handoffs
for select
using (
  user_has_business_access(business_id)
);

create policy "handoffs_insert"
on agent_handoffs
for insert
with check (
  user_has_business_access(business_id)
);

create policy "handoffs_update"
on agent_handoffs
for update
using (
  user_has_business_access(business_id)
);

create policy "handoffs_delete"
on agent_handoffs
for delete
using (
  user_has_business_access(business_id)
);

-- =====================================================
-- MESSAGES
-- =====================================================

create policy "messages_select"
on messages
for select
using (
  exists (
    select 1
    from conversations c
    where c.id = messages.conversation_id
      and user_has_business_access(c.business_id)
  )
);

create policy "messages_insert"
on messages
for insert
with check (
  exists (
    select 1
    from conversations c
    where c.id = messages.conversation_id
      and user_has_business_access(c.business_id)
  )
);

create policy "messages_update"
on messages
for update
using (
  exists (
    select 1
    from conversations c
    where c.id = messages.conversation_id
      and user_has_business_access(c.business_id)
  )
);

create policy "messages_delete"
on messages
for delete
using (
  exists (
    select 1
    from conversations c
    where c.id = messages.conversation_id
      and user_has_business_access(c.business_id)
  )
);

-- =====================================================
-- SUBSCRIPTIONS
-- =====================================================

create policy "subscriptions_select"
on subscriptions
for select
using (
  user_has_business_access(business_id)
);

create policy "subscriptions_service_role"
on subscriptions
for all
to service_role
using (true)
with check (true);

-- =====================================================
-- STORAGE RLS
-- =====================================================

create policy "storage_documents_select"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'documents'
  and exists (
    select 1
    from businesses b
    where b.id::text = (storage.foldername(name))[1]
      and user_has_business_access(b.id)
  )
);

create policy "storage_documents_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'documents'
  and exists (
    select 1
    from businesses b
    where b.id::text = (storage.foldername(name))[1]
      and user_has_business_access(b.id)
  )
);

create policy "storage_documents_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'documents'
  and exists (
    select 1
    from businesses b
    where b.id::text = (storage.foldername(name))[1]
      and user_has_business_access(b.id)
  )
);

create policy "storage_documents_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'documents'
  and exists (
    select 1
    from businesses b
    where b.id::text = (storage.foldername(name))[1]
      and user_has_business_access(b.id)
  )
);

-- =====================================================
-- VECTOR SEARCH FUNCTION
-- =====================================================

create or replace function match_knowledge_chunks(
  query_embedding vector(768),
  match_threshold float,
  match_count int,
  business_uuid uuid
)
returns table (
  id uuid,
  content text,
  similarity float
)
language sql
stable
security definer
set search_path = public
as $$
  select
    kc.id,
    kc.content,
    1 - (kc.embedding <=> query_embedding) as similarity
  from knowledge_chunks kc
  where kc.business_id = business_uuid
    and user_has_business_access(kc.business_id)
    and 1 - (kc.embedding <=> query_embedding) > match_threshold
  order by kc.embedding <=> query_embedding
  limit match_count;
$$;

-- =====================================================
-- PERFORMANCE INDEXES
-- =====================================================

create index if not exists idx_business_owner
on businesses(owner_id);

create index if not exists idx_business_members_business
on business_members(business_id);

create index if not exists idx_business_members_user
on business_members(user_id);

create index if not exists idx_conversations_business
on conversations(business_id);

create index if not exists idx_messages_conversation
on messages(conversation_id);

create index if not exists idx_documents_business
on documents(business_id);

create index if not exists idx_chunks_business
on knowledge_chunks(business_id);

create index if not exists idx_handoffs_business
on agent_handoffs(business_id);

create index if not exists idx_chunks_embedding
on knowledge_chunks
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);
