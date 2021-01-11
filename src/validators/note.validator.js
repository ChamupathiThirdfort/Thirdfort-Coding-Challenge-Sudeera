import Joi from "joi";

export const NoteValidator = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

export const NoteSearchValidator = Joi.object({
  keyword: Joi.string().required(),
  page: Joi.number(),
});