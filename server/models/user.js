import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    status: String,
    bio: String,
    avatarUrl: String,
    followers: [String],
    following: [String],
    issues: [{
            title: String,
            state: {type: String, enum: ["OPEN", "CLOSED"]},
            createdAt: String
        }]
});

export default mongoose.model("User", userSchema);