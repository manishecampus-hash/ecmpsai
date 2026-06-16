import { NextResponse } from 'next/server';
import { universities } from '@/lib/data';

export async function GET() {
  return NextResponse.json(universities);
}
