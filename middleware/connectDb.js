import mongoose from 'mongoose';

const connectDb = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res);
    }
    await mongoose.connect(process.env.MONGOOSE_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
    )
    .then(e => console.log('Database Connected'))
    .catch(e => console.log(e));

    return handler(req, res);

}

export default connectDb;