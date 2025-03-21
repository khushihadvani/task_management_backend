const { body, query,  validationResult } = require('express-validator');

// Create Task Validation
exports.validateCreateTaskData = [
    body('title').isString().notEmpty().withMessage("Title must be a non-empty string"),
    body('description').isString().notEmpty().withMessage("Description must be a non-empty string"),
    body('assignedTo').isMongoId().withMessage("AssignedTo ID must be a valid MongoDB ObjectId"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Get Task by ID Validation
exports.validateGetOneTaskData = [
    query('id').optional().isMongoId().withMessage("Valid task ID required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Delete Task Validation
exports.validateDeleteTaskData = [
    query('id').isMongoId().withMessage("Valid task ID required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Update Task Validation
exports.validateUpdateTaskData = [
    query('id').isMongoId().withMessage("id "),
    body('title').optional().isString().withMessage("Title must be a string"),
    body('description').optional().isString().withMessage("Description must be a string"),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage("Status must be one of 'pending', 'in-progress', or 'completed'"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
