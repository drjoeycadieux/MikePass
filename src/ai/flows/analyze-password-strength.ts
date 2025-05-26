'use server';

/**
 * @fileOverview Password strength analysis flow using Genkit.
 *
 * - analyzePasswordStrength - Analyzes the strength of a given password and provides suggestions for improvement.
 * - AnalyzePasswordStrengthInput - The input type for the analyzePasswordStrength function.
 * - AnalyzePasswordStrengthOutput - The return type for the analyzePasswordStrength function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePasswordStrengthInputSchema = z.object({
  password: z.string().describe('The password to analyze.'),
});
export type AnalyzePasswordStrengthInput = z.infer<typeof AnalyzePasswordStrengthInputSchema>;

const AnalyzePasswordStrengthOutputSchema = z.object({
  strengthScore: z
    .number()
    .describe('A score from 0 to 1 indicating the password strength.'),
  analysis: z
    .string()
    .describe(
      'An analysis of the password, including potential weaknesses and suggestions for improvement.'
    ),
});
export type AnalyzePasswordStrengthOutput = z.infer<typeof AnalyzePasswordStrengthOutputSchema>;

export async function analyzePasswordStrength(
  input: AnalyzePasswordStrengthInput
): Promise<AnalyzePasswordStrengthOutput> {
  return analyzePasswordStrengthFlow(input);
}

const analyzePasswordStrengthPrompt = ai.definePrompt({
  name: 'analyzePasswordStrengthPrompt',
  input: {schema: AnalyzePasswordStrengthInputSchema},
  output: {schema: AnalyzePasswordStrengthOutputSchema},
  prompt: `You are an expert in password security.

  Analyze the following password and provide a strength score between 0 and 1, and an analysis of its weaknesses and suggestions for improvement.

  Password: {{{password}}}
  `,
});

const analyzePasswordStrengthFlow = ai.defineFlow(
  {
    name: 'analyzePasswordStrengthFlow',
    inputSchema: AnalyzePasswordStrengthInputSchema,
    outputSchema: AnalyzePasswordStrengthOutputSchema,
  },
  async input => {
    const {output} = await analyzePasswordStrengthPrompt(input);
    return output!;
  }
);
