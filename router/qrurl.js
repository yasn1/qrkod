const express = require('express');
const app = express();
const qr = require('qrcode');
const router = express.Router();
router.get('/qrurl', (req, res) => {
  let key = req.session.key || false;
  if (key) {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }
    qr.toDataURL(url, (err, qrCode) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to generate QR code' });
      }
      res.send(qrCode);
    });
  } else {
    res.status(400).json({ "message": "verification failed.", "status": 400 })
  }

});

module.exports = router;
