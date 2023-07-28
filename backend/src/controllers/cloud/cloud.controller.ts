import asyncHandler from "express-async-handler";

export const set_file = asyncHandler(async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  res.json("ok")
});
