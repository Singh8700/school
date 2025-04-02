import Cors from 'cors';

// CORS setup
const cors = Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: '*', // Specific origin bhi set kar sakte hain
});

// Apply CORS Middleware
export default async function applyCors(req) {
    return new Promise((resolve, reject) => {
        // Dummy response object create karte hain
        const dummyRes = {
            setHeader: () => {},
            status: () => dummyRes,
            json: () => {},
        };

        cors(req, dummyRes, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}
