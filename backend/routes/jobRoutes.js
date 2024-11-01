const express = require('express');
const { getJobs, getJobById, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', authMiddleware, createJob);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);

module.exports = router;