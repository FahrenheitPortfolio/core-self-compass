import { z } from 'zod';
import DOMPurify from 'dompurify';

// Sanitization utility
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input.trim());
};

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number');

export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces');

export const journalEntrySchema = z
  .string()
  .min(1, 'Journal entry cannot be empty')
  .max(5000, 'Journal entry must be less than 5000 characters');

export const moodRatingSchema = z
  .number()
  .min(1, 'Mood rating must be at least 1')
  .max(8, 'Mood rating cannot exceed 8');

export const energyLevelSchema = z
  .number()
  .min(1, 'Energy level must be at least 1')
  .max(10, 'Energy level cannot exceed 10');

// Form validation schemas
export const profileUpdateSchema = z.object({
  first_name: nameSchema,
  last_name: nameSchema,
  email: emailSchema,
});

export const moodEntrySchema = z.object({
  mood_rating: moodRatingSchema,
  energy_level: energyLevelSchema,
  stress_level: z.number().min(1).max(10),
  notes: journalEntrySchema,
  tags: z.array(z.string()).optional(),
});

export const therapistShareSchema = z.object({
  therapist_name: z.string().optional(),
  therapist_email: emailSchema,
  message: z.string().max(1000, 'Message must be less than 1000 characters').optional(),
});

// Rate limiting validation
export const rateLimitSchema = z.object({
  action: z.string(),
  timestamp: z.number(),
  count: z.number().max(10, 'Rate limit exceeded'),
});