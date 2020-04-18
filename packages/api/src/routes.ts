import express from 'express';
import * as currency from 'currency.js';
import moment from 'moment';
import fs from 'fs';
import pug from 'pug';
import path from 'path';
import passport from './util/passport';
import models from './db/models';
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
        userId: user.id,
      },
      attributes: ['filePath', 'issueDate', 'dueDate', 'type', 'number', 'sum'],
      include: [
        models.Partner,
        {
          model: models.InvoiceItem,
          as: 'items',
          include: [models.Unit, models.Item],
          attributes: ['name', 'quantity', 'price'],
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
            'postalCode',
          ],
        },
      ],
    });

    if (invoice) {
      if (invoice.type === 'PURCHASE' && invoice.filePath) {
        pdf = fs.readFileSync(path.join('..', '..', 'purchaseUploads', invoice.filePath));
      } else if (invoice.type === 'SALE') {
        const plainInvoice: any = invoice.get({ plain: true });

        const formatDate = (date) => moment(date).format('DD.MM.YYYY');
        const formatCurrency = (value) => currency(value).toString();

        plainInvoice.issueDate = formatDate(plainInvoice.issueDate);
        plainInvoice.dueDate = formatDate(plainInvoice.dueDate);

        plainInvoice.sum = formatCurrency(plainInvoice.sum);

        plainInvoice.items.forEach((item) => {
          item.price = currency(item.price).toString();
          item.extendedPrice = currency(item.price).multiply(item.quantity).toString();
        });

        const invoiceTemplate = pug.compileFile('./src/templates/saleInvoice.pug');

        pdf = await convertHTMLToPDF(invoiceTemplate(plainInvoice));
      }
    }

    if (pdf) {
      res.setHeader('Content-Type', 'application/pdf');
      return res.send(pdf);
    }

    res.status(404);
    return res.send('Invoice not found.');
  } catch (err) {
    res.status(404);
    res.send('Error retrieving file.');
    throw err;
  }
});

router.get('/files/test', async (req, res) => {
  try {
    const template = pug.compileFile('./src/templates/saleInvoice.pug');

    const pdf = await convertHTMLToPDF(
      template({
        user: {
          name: 'LOLL',
          street: 'Kreutzwaldi 17-14',
          city: 'Võru',
          postalCode: '65609',
          county: 'Võrumaa',
          regNr: '122939029',
          phoneNr: '53 54 2265',
          email: 'stevenjuks@gmail.com',
          settings: {
            overdueCharge: 5,
          },
          bankAccounts: [{ bankName: 'Swedbank', accountNumber: 'EE1293019238135929230903' }],
        },
        partner: {
          name: 'CIRCLE K',
          street: 'Pärnu mnt',
          city: 'Tallinn',
          postalCode: '93203',
          county: 'Harjumaa',
          email: 'circlek@mail.ee',
          VATnr: '29301299012',
          phoneNr: '53 54 2231',
          regNr: '2991202012',
        },
        number: 'ARVE-1',
        issueDate: '21.03.2020',
        dueDate: '10.04.2020',
        items: [
          {
            name: 'Macbook Pro',
            price: '1500.00',
            quantity: 5,
            unit: { abbr: 'tk' },
            extendedPrice: '7500.00',
          },
        ],
        sum: '7500.00',
        description: 'Makstud ülekandega',
      })
    );

    res.setHeader('Content-Type', 'application/pdf');
    return res.send(pdf);
  } catch (err) {
    res.status(404);
    res.send('File not found.');
    throw err;
  }
});

export default router;
