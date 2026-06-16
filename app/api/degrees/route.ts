import { NextResponse } from 'next/server';
import { degrees } from '@/lib/data';

export async function GET() {
  return NextResponse.json(degrees);
}
