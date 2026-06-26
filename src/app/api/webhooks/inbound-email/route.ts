import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Expected to receive multipart/form-data from SendGrid Inbound Parse or similar
    const formData = await req.formData();
    
    const to = formData.get('to') as string;
    const from = formData.get('from') as string;
    const subject = formData.get('subject') as string;
    const text = formData.get('text') as string;
    
    // In a real scenario, we would parse CAS statements from attachments:
    // const attachments = formData.getAll('attachment');
    
    console.log(`[Email Parser Webhook] Received email from: ${from}`);
    console.log(`Subject: ${subject}`);

    // Prototype: Basic keyword matching for hybrid tracking
    let foundAssets = [];
    
    if (text) {
      if (text.toLowerCase().includes('epf balance') || text.toLowerCase().includes('provident fund')) {
        // Mock regex extraction
        const match = text.match(/(?:rs\.?|inr|₹)\s*([\d,]+)/i);
        if (match) {
          const value = parseInt(match[1].replace(/,/g, ''), 10);
          foundAssets.push({ type: 'EPF', value });
        } else {
          foundAssets.push({ type: 'EPF', value: 'Needs manual verification' });
        }
      }
      
      if (text.toLowerCase().includes('mutual fund') || text.toLowerCase().includes('cas statement')) {
         foundAssets.push({ type: 'MUTUAL_FUND', value: 'CAS PDF attached - requires OCR processing' });
      }
    }

    // Next steps would be finding the user by 'from' email in Supabase 
    // and storing these foundAssets in their 'portfolios' table.

    return NextResponse.json({ 
      success: true, 
      message: "Email received and parsed successfully.",
      parsedAssets: foundAssets
    }, { status: 200 });
    
  } catch (error) {
    console.error("[Email Parser Webhook] Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
