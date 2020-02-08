import express from 'express';
import fs from 'fs';
import path from 'path';
import passport from './util/passport';
import models from './db/models';

const router = express.Router();

router.get('/files/invoice', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { user }: any = req;
  const { invoiceId } = req.query;

  let pdf = null;

  try {
    const invoice = await models.Invoice.findOne({
      where: {
        id: invoiceId,
        userId: user.id
      },
      attributes: ['filePath']
    });

    if (invoice && invoice.filePath) {
      pdf = fs.readFileSync(path.join('..', '..', 'purchaseUploads', invoice.filePath));

      if (pdf) {
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf);
        return;
      }
    }

    throw new Error('File not found.');
  } catch (err) {
    res.status(404);
    res.send(err.message);
  }
});

export default router;
