import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { Job } from "../../../models/listing/jobs/index.js";

const createJob = AsyncHandler(async (req, res) => {
  const {
    user,
    categoryName,
    productType,
    role,
    jobDescription,
    jobLocation,
    salaryRange,
    media,
    location,
  } = req.body;

  try {
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, user, "user id is required"));
    } else if (!categoryName) {
      return res
        .status(400)
        .json(new ApiResponse(400, categoryName, "category name is required"));
    } else if (!productType) {
      return res
        .status(400)
        .json(new ApiResponse(400, productType, "product type is required"));
    } else if (!role) {
      return res
        .status(400)
        .json(new ApiResponse(400, role, "role of the job is required"));
    } else if (!jobLocation) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, jobLocation, "location of the job is required")
        );
    } else if (!jobDescription) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            jobDescription,
            "description of the job is required"
          )
        );
    } else if (!salaryRange) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            jobDescription,
            "salary range of the job is required"
          )
        );
    } else if (!media) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, media, "atleast one image or video is required")
        );
    } else if (!location) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, location, "location of the job is required")
        );
    } else {
      const newJob = new Job(req.body);
      const savedJob = await newJob.save();
      const job_location_user = await Job.findById(savedJob._id).populate({
        path: "user",
      });
      const item = new Item({
        item: job_location_user,
        location: job_location_user.location,
      });
      const savedInItems = await item.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            job_location_user,
            "new job created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new job ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while creating new job"));
  }
});
const getAllJob = AsyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, jobs, "these are all the jobs"));
  } catch (error) {
    console.log("error while fetching all jobs ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething all jobs"));
  }
});
const getSingleJob = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the job"));
    }
    const job = await Job.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!job) {
      return res
        .status(404)
        .json(new ApiResponse(404, job, "the job does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, job, "job fetched successfully"));
  } catch (error) {
    console.log("error while fetching single job ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething single job"));
  }
});
const updateJob = AsyncHandler(async (req, res) => {
  const {
    _id,
    role,
    jobDescription,
    salaryRange,
    additionalInformation,
    media,
    location,
  } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "_id the of the document is required"));
    }
    const updatedJob = await Job.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedJob) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedJob, "job not found"));
    } else if (updatedJob) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, updatedJob, "your listing for this job updated")
        );
    }
  } catch (error) {
    console.log("error while updating the job  ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the job"));
  }
});
const deleteJob = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedJob = await Job.findByIdAndDelete(_id);
    if (!deletedJob) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "job does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "job deleted successfully"));
  } catch (error) {
    console.log("error while deleting the job ", error);
    res
      .status(500)
      .json(
        new ApiResponse(500, error, "internal server error while deleting job")
      );
  }
});

export { createJob, getAllJob, getSingleJob, updateJob, deleteJob };
