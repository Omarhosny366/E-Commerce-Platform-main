import mongoose from 'mongoose';
import process from 'process';

const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);

        const conn = mongoose.connection;

        conn.on('connected', () => {
            console.log('Database Connected');
        });

        conn.on('error', (err: Error) => {
            console.error('Database Connection Error:', err);
        });
    } catch (error) {
        console.error('Initial Database Connection Error:', error);
    }
};

export default connect;
