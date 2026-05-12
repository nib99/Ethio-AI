import { NextRequest } from 'next/server';
import { createClient } from '@/lib/db/supabase';
import { processDocument } from '@/lib/ai/embeddings';
import { validateFile } from '@/lib/security/file-validator';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const businessId = formData.get('businessId') as string;

    if (!file || !businessId) {
      return Response.json({ error: "Missing file or businessId" }, { status: 400 });
    }

    // === Security Validation ===
    const validation = validateFile(file);
    if (!validation.valid) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const supabase = createClient();

    // Upload to Supabase Storage (with business isolation)
    const fileExt = file.name.split('.').pop();
    const safeFileName = `\( {Date.now()}- \){Math.random().toString(36).slice(2)}.${fileExt}`;
    const path = `\( {businessId}/ \){safeFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: document } = await supabase
      .from('documents')
      .insert({
        business_id: businessId,
        filename: file.name,
        file_url: path,
        mime_type: file.type,
        status: 'processing'
      })
      .select()
      .single();

    // Offload heavy processing (non-blocking)
    // In production: Use Trigger.dev / Inngest / QStash
    processDocument(file, document.id, businessId).catch(console.error);

    return Response.json({
      success: true,
      documentId: document.id,
      message: "Document uploaded. Processing started."
    });

  } catch (error: any) {
    console.error(error);
    return Response.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
