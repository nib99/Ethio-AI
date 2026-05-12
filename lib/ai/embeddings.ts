import { supabaseAdmin } from '@/lib/db/supabase';
import { generateEmbedding } from './gemini';
import pdfParse from 'pdf-parse';

export async function processDocument(file: File, documentId: string, businessId: string) {
  try {
    let text = '';

    if (file.type === 'application/pdf') {
      const buffer = Buffer.from(await file.arrayBuffer());
      const data = await pdfParse(buffer);
      text = data.text;
    } else {
      text = await file.text();
    }

    // Smart chunking
    const chunkSize = 800;
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }

    const records = [];

    for (const chunk of chunks) {
      if (chunk.trim().length < 30) continue;

      const embedding = await generateEmbedding(chunk);

      records.push({
        document_id: documentId,
        business_id: businessId,
        content: chunk.trim(),
        embedding: embedding,
      });
    }

    if (records.length > 0) {
      await supabaseAdmin.from('knowledge_chunks').insert(records);
    }

    await supabaseAdmin
      .from('documents')
      .update({ status: 'completed' })
      .eq('id', documentId);

    console.log(`✅ Processed ${records.length} chunks for document ${documentId}`);
  } catch (error) {
    console.error("Document processing failed:", error);
    await supabaseAdmin
      .from('documents')
      .update({ status: 'failed' })
      .eq('id', documentId);
  }
}
