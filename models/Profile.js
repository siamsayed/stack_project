const {Schema ,model}=require("mongoose")


const userProfile=new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    title: {
        type: String,
        trim: true,
        maxlength: 100
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500
    },
    profilePic: String,
    links: {
        website: String,
        facebook: String,
        twitter: String,
        github: String
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
},{timestamps:true})


module.exports=model("Profile",userProfile)