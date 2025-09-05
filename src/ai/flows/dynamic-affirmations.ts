// This is a server-side file.
'use server';

/**
 * @fileOverview A dynamic affirmation generator.
 *
 * - generateAffirmation - A function that generates a motivational affirmation.
 * - GenerateAffirmationInput - The input type for the generateAffirmation function (currently empty).
 * - GenerateAffirmationOutput - The return type for the generateAffirmation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAffirmationInputSchema = z.object({});
export type GenerateAffirmationInput = z.infer<typeof GenerateAffirmationInputSchema>;

const GenerateAffirmationOutputSchema = z.object({
  affirmation: z.string().describe('A motivational affirmation.'),
});
export type GenerateAffirmationOutput = z.infer<typeof GenerateAffirmationOutputSchema>;

export async function generateAffirmation(input: GenerateAffirmationInput): Promise<GenerateAffirmationOutput> {
  return generateAffirmationFlow(input);
}

const themeOptions = ["Collaboration", "Innovation", "Audiovisual Excellence", "Unified Communication", "Digital Transformation"];

const prompt = ai.definePrompt({
  name: 'generateAffirmationPrompt',
  input: {schema: GenerateAffirmationInputSchema},
  output: {schema: GenerateAffirmationOutputSchema},
  prompt: `You are a motivational speaker in the style of Tony Robbins. Generate a single, powerful, and inspiring affirmation.

Optionally, but only if it fits naturally, subtly include the current theme, which is: {{{theme}}}.  The theme is related to business and technology.

Affirmation: `,
});

const generateAffirmationFlow = ai.defineFlow(
  {
    name: 'generateAffirmationFlow',
    inputSchema: GenerateAffirmationInputSchema,
    outputSchema: GenerateAffirmationOutputSchema,
  },
  async () => {
    const theme = themeOptions[Math.floor(Math.random() * themeOptions.length)];
    const {output} = await prompt({theme});
    return output!;
  }
);
