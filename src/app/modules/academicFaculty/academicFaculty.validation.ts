import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});
const update = z.object({
  body: z
    .object({
      title: z.string({}).optional(),
    })
    .refine(value => 'title' in value, {
      message: 'Invalid field name detected. Only title is allowed.',
    }),
});
export const academicFacultyValidation = {
  create,
  update,
};
