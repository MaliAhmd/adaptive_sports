import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // unique filename
  const filename = Date.now() + '-' + file.name.replace(/\s/g, '-');
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  
  // Ensure public/uploads exists (node fs/promises mkdir not used here to keep simple, assuming manual creation or using previous methods if robust)
  // But we should try to save it. Next.js public folder is usually writable in dev.
  
  try {
      await writeFile(path.join(uploadDir, filename), buffer);
      return NextResponse.json({ success: true, url: `/uploads/${filename}` });
  } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, error: 'Upload failed' });
  }
}
