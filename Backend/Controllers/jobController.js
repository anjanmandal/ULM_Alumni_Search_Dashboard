const Alumni = require('../Models/Alumni')
const JobPosting=require('../Models/job')
exports.addJobPosting = async (req, res) => {
    const { title, company, description, location, alumniId, link } = req.body;
  
    try {
      const alumni = await Alumni.findById(alumniId);
      if (!alumni) {
   
        return res.status(404).json({ error: 'Alumni not found' });
      }
  
      const newJobPosting = new JobPosting({
        title,
        company,
        description,
        location,
        alumni: alumni._id,
        link, // Include link in job posting creation
      });
  
      await newJobPosting.save();
      alumni.jobPostings.push(newJobPosting._id); // Add job posting to alumni
      await alumni.save();
  
      res.status(201).json({ message: 'Job posting created successfully', job: newJobPosting });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  exports.getJobPostings = async (req, res) => {
    try {
      const jobs = await JobPosting.find().populate('alumni', 'name profilePicture');
      res.status(200).json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };