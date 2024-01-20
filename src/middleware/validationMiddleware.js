import { body, param, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';

// handle errors that comes from input validation functions
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

// validation of the post creating request
export const validatePostInput = withValidationErrors([
  body('title').notEmpty().withMessage('Post title is required'),
  body('body').notEmpty().withMessage('Post body is required'),
  body('creatorId')
    .notEmpty()
    .withMessage('Post creatorId is required')
    .isNumeric()
    .withMessage('Post creatorId must be a number'),
]);

// validation of the post creating request

export const validateCreatorId = withValidationErrors([
  param('id').isNumeric().withMessage('Post creatorId must be a number'),
]);
