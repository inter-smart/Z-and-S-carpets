import { API_URL } from '@/lib/api/client'
import { NextResponse, type NextRequest } from 'next/server'

// Thin proxy for the contact form: keeps the backend URL and CORS out of the browser and
// forwards the multipart body (name, email, phone, requirements, file) as is.
export async function POST(request: NextRequest) {
  try {
    const body = await request.formData()

    // the server answers (validation, duplicate email, upload errors) in this language
    const lang = request.nextUrl.searchParams.get('lang') === 'ar' ? 'ar' : 'en'

    const res = await fetch(
      `${API_URL}/api/frontend/contact-enquiry?lang=${lang}`,
      {
        method: 'POST',
        body,
        cache: 'no-store',
      },
    )
    const result = await res.json().catch(() => ({}))

    if (!res.ok) {
      return NextResponse.json(
        {
          error_code: result?.error_code ?? 'REQUEST_FAILED',
          message: result?.message ?? 'Request failed',
          // per-field messages from the server (validation / upload errors)
          errors: Array.isArray(result?.errors) ? result.errors : [],
        },
        { status: res.status },
      )
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error_code: 'REQUEST_FAILED', message: 'Request failed' },
      { status: 502 },
    )
  }
}
