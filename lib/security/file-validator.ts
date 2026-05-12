export function validateFile(file: File) {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

  if (file.size > MAX_SIZE) {
    return { valid: false, error: "File size exceeds 10MB limit" };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: "Only PDF, DOCX, and TXT files are allowed" };
  }

  // Basic malware filename check
  const dangerousPatterns = /\.(exe|bat|js|php|html)$/i;
  if (dangerousPatterns.test(file.name)) {
    return { valid: false, error: "File type not allowed" };
  }

  return { valid: true };
}
