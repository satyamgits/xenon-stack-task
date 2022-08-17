//meme model
const Contact = require('../models/contact');
const Meme = require('../models/meme')

//this function will give the list of all the memes in the database
exports.getMemes = async (req, res) => {
    try{
        const response = await Meme.find({});
    
        return res.status(200).json({ data: response })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: 'internal error'})
    }
}

//this function will respond with the meme requested by the given id
exports.getMemeById = async (req, res) => {
    const id = req.params.id

    try{
        const meme = await Meme.findById(id)
        if(!meme){
            return res.status(404).json({ msg: "no meme found by that id"})
        }
        return res.status(200).json({data: meme})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg: 'internal error'})
    }
}

//this function will store the incoming meme to the database
exports.postMeme = async (req, res) => {
    let name = req.body.name
    let caption = req.body.caption
    let url = req.body.url

    if(!name){
        name = req.query.name
        caption = req.query.caption
        url = req.query.url
    }

    try{
        const currentMeme = await Meme.findOne({name: name, caption: caption, url: url})
        //if a meme with the same payload already exists
        if(currentMeme){
            return res.status(409).json({ msg: 'Meme already exists', id: currentMeme._id })
        }
        // if not exists then we'll create one
        const meme = new Meme({
            name: name,
            caption: caption,
            url: url
        })

        const response = await meme.save()
        return res.status(201).json({ id: response._id })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg: 'internal error'})
    }
}

//this functions will patch the update to any meme
exports.patchUpdate = async (req, res) => {
    const id = req.params.id
    const caption= req.body.caption
    const url = req.body.url

    try{
        const currentMeme = await Meme.findById(id)
        if(!currentMeme){
            return res.status(404).json({ msg: "no meme found by that id"})
        }
        const newMeme = {
            name: currentMeme.name,
            caption: caption ? caption : currentMeme.caption,
            url: url ? url : currentMeme.url
        }
        Meme.findByIdAndUpdate(id, 
            { "$set":  {...newMeme} },
            {upsert: true},
            (err, data) => { 
                if(err) throw err;
                return res.status(202).json({msg: "meme updated"})
            }
        )
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg: 'internal error'})
    }

}

//this function will store the comments to a meme
exports.patchComments = async (req, res) => {
    const id = req.params.id
    const body = req.body.body
    const date = new Date()

    try{
        const currentMeme = await Meme.findById(id)
        if(!currentMeme){
            return res.status(404).json({ msg: "No meme found by that id"})
        }
        const newComment = {
            body: body,
            date: date
        }
        Meme.findByIdAndUpdate(id, 
            { "$push": {"comments": newComment} },
            { "new": true, "upsert": true },
            function(err, data){
                if(err) throw err;
                return res.status(202).json({msg: "comment added" })
            }
        );
        // console.log(response)
        // return res.status(202).json({msg: "comment added" })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg: 'internal error'})
    }
}

exports.patchLikes = async (req, res) => {
    const id = req.params.id

    try{
        const currentMeme = await Meme.findById(id)
        if(!currentMeme){
            return res.status(404).json({ msg: "No meme found by that id"})
        }
        let likes = currentMeme.likes
        likes = likes +1
        Meme.findByIdAndUpdate(id, 
            { "$set":  {"likes": likes} },
            {upsert: true},
            (err, data) => { 
                if(err) throw err;
                return res.status(202).json({msg: "likes updated", likes: likes})
            }
        )
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg: 'internal error'})
    }
}

exports.patchDislikes = async (req, res) => {
    const id = req.params.id

    try{
        const currentMeme = await Meme.findById(id)
        if(!currentMeme){
            return res.status(404).json({ msg: "No meme found by that id"})
        }
        let likes = currentMeme.likes
        likes = likes -1
        const response = await Meme.findByIdAndUpdate(id, 
            { "$set":  {"likes": likes} },
            {upsert: true},
            (err, data) => { 
                if(err) throw err;
                return res.status(202).json({msg: "likes updated", likes: likes})
            }
        )
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg: 'internal error'})
    }
}

exports.postContactUs = async (req, res) => {
    const name = req.body.name;
    const heading = req.body.heading;
    const email = req.body.email;
    const description = req.body.description;

    try{
        const contact = new Contact({
            name: name,
            email: email,
            heading: heading,
            description: description
        })

        const result = await contact.save();
        console.log(result);

        res.status(201).json({data: result, msg : "Query Registered"});
    }
    catch(error) {
        console.log(error);
    }

}