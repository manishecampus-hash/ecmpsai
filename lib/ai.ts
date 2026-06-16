import type { AIRecommendation } from '@/types';

export async function getAIRecommendation(params: {
  goal: string;
  budget: string;
  education: string;
  experience: string;
}): Promise<AIRecommendation> {
  const res = await fetch('/api/ai/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Failed to get AI recommendation');
  return res.json();
}
