const Job = require('../models/Job');
const jwt = require('jsonwebtoken');

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createJob = async (req, res) => {
    const { title, company, location, type, description } = req.body;
    try {
        const job = await Job.create({ title, company, location, type, description, submittedBy: req.user.id });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateJob = async (req, res) => {
    const { id } = req.params;
    const { title, company, location, type, description } = req.body;
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.submittedBy.toString() !== decoded.id) {
            return res.status(403).json({ message: 'You are not authorized to update this job' });
        }

        job.title = title;
        job.company = company;
        job.location = location;
        job.type = type;
        job.description = description;

        await job.save();
        res.status(200).json({ message: 'Job updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteJob = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.submittedBy.toString() !== decoded.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this job' });
        }

        await Job.findByIdAndDelete(id);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};