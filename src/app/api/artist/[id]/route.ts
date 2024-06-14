import { NextRequest, NextResponse } from 'next/server';
import { getArtistData } from '../../../../lib/spotify';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Artist ID is required' }, { status: 400 });
  }

  try {
    const data = await getArtistData(id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch artist data' }, { status: 500 });
  }
}
