const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "superJWTSecret";
const CONNECTION_STRING = process.env.CONNECTION_STRING || `mongodb+srv://dbAdmin:dbAdmin123@cluster0.zstyd.mongodb.net/Cluster0?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const User = mongoose.model("User", {
    fullname: String,
    email: String,
    password: String
});

const Event = mongoose.model("Event", {
    type: String,
    userId: String,
    startDate: String,
    endDate: String,
    location: String,
    title: String
});

const resolvers = {
    Query: {
        user: (_, args) => {
            return User.findById(args.id);
        },
        event: (_, args) => {
            return Event.findById(args.id);
        },
        users: () => User.find()
    },
    Mutation: {
        login: async (_, { input }) => { 
            const user = await User.findOne({
                email: input.email, 
                password: input.password
            });
            if (user === null) {
                return {
                    ok: false,
                    error: "User not found"
                };
            }
            else {
                const { _id, email, fullname } = user;
                const token = jwt.sign({ _id, email, fullname }, JWT_SECRET);
                user.token = token;
                return {
                    ok: true,
                    user,
                }
            }
        },
        register: async (_, { input }) => {
            const user = await new User(input).save();
            const { _id, email, fullname } = user;
            const token = jwt.sign({ _id, email, fullname }, JWT_SECRET);
            user.token = token;
            return user;
        },
        registerEvent: (_, { input }) => {
            const event = new Event(input);
            return event.save();
        }
    }
};

module.exports = resolvers;
