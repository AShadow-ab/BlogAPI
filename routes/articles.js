const express = require("express")
const router = express.Router()
const Article = require("../models/Article")
const validateArticle = require("../validation/articleValidation")


router.post("/", async (req,res)=>{
    const {error} = validateArticle.validate(req.body)

    if(error) return res.status(400).json(error.details[0].message)

    const article = new Article(req.body)
    await article.save()

    res.status(201).json(article)
})


router.get("/", async(req,res)=>{
    const articles = await Article.find()
    res.json(articles)
})


router.get("/:id", async(req,res)=>{
    const article = await Article.findById(req.params.id)

    if(!article) return res.status(404).json("Article not found")

    res.json(article)
})


router.put("/:id", async(req,res)=>{

    const {error} = validateArticle.validate(req.body)

    if(error) return res.status(400).json(error.details[0].message)

    const updated = await Article.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    res.json(updated)
})


router.delete("/:id", async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.json({message:"Deleted successfully"})
})

module.exports = router