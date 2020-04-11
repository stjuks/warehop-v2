import express from 'express';
import fs from 'fs';
import pug from 'pug';
import path from 'path';
import passport from './util/passport';
import models from './db/models';
import { parseInvoice } from './resolvers/invoice';
import { convertHTMLToPDF } from './util/puppeteer';

const router = express.Router();

router.get('/files/invoice', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { user }: any = req;
  const { invoiceId } = req.query;

  let pdf = null;

  try {
    let invoice = await models.Invoice.findOne({
      where: {
        id: invoiceId,
        userId: user.id
      },
      attributes: ['filePath', 'issueDate', 'dueDate', 'type', 'number', 'sum'],
      include: [
        models.Partner,
        {
          model: models.InvoiceItem,
          as: 'items',
          include: [models.Unit, models.Item],
          attributes: ['name', 'quantity', 'price']
        },
        {
          model: models.User,
          attributes: [
            'name',
            'regNr',
            'email',
            'phoneNr',
            'county',
            'city',
            'street',
            'postalCode'
          ]
        }
      ]
    });

    if (invoice) {
      invoice = parseInvoice(invoice);

      if (invoice.type === 'PURCHASE' && invoice.filePath) {
        pdf = fs.readFileSync(path.join('..', '..', 'purchaseUploads', invoice.filePath));
      } else if (invoice.type === 'SALE') {
        const invoiceTemplate = pug.compileFile('./templates/test.pug');

        pdf = await convertHTMLToPDF(invoiceTemplate(invoice));
      }
    }

    if (pdf) {
      res.setHeader('Content-Type', 'application/pdf');
      return res.send(pdf);
    }

    throw new Error('File not found.');
  } catch (err) {
    res.status(404);
    res.send(err.message);
  }
});

export default router;
