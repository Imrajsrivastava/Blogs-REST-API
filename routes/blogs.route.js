const express = require("express");
const blogsRouter = express.Router();

const { BlogModel } = require("../models/model.blog");


//Routes ..

blogsRouter.get("/", async (req, res) => {
  const blogs = await BlogModel.find({});

  res.send({ blogs });
});

// get myblogs ..

blogsRouter.get("/myblogs", async (req, res) => {
  const userId = req.user;
  const blogs = await BlogModel.find({ author: userId });
  res.send({ msg: true, blogs });
});

// getOne blog route

blogsRouter.get("/:blogID", async (req, res) => {
  const blog = await BlogModel.findById({ _id: req.params.blogID });
  res.send({ blog });
});

blogsRouter.post("/create", async (req, res) => {
  const { title, content } = req.body;

  const blog = new BlogModel({
    title,
    content,
    author: req.user,
  });

  await blog.save();
  res.send({ msg: "blog created !" });
});

blogsRouter.put("/edit/:blogID", async (req, res) => {
  let { blogID } = req.params;
  const blog = await BlogModel.findOne({ _id: blogID });

  if (blog.author == req.user) {
    await BlogModel.findByIdAndUpdate({ _id: blogID }, req.body, { new: true });
    res.send({ msg: "edited done" });
  } else {
    res.send({ msg: "u r not allowed to do!" });
  }
});

blogsRouter.delete("/delete/:blogID", async (req, res) => {
  let { blogID } = req.params;
  const blog = await BlogModel.findOne({ _id: blogID });

  if (blog.author == req.user) {
    await BlogModel.findByIdAndDelete({ _id: blogID });
    return res.send({ msg: "deleted done" });
  } else {
    return res.send({ msg: "u r not allowed to do!" });
  }
});

module.exports = { blogsRouter };
