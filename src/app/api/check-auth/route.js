// pages/api/check-auth.js

export default function handler(req, res) {
    const { token } = req.cookies;
  console.log("cookies",req.cookies)
    if (token) {
      res.status(200).json({ authenticated: true });
    } else {
      res.status(200).json({ authenticated: false });
    }
  }
  