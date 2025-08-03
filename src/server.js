import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import { getContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  dotenv.config();
  const app = express();

  const PORT = getEnvVar(ENV_VARS.PORT);

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/contacts', async (_req, res) => {
    const contacts = await getContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: `Contact not found`,
      });
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}! `,
      data: contact,
    });
  });
  app.use((_req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, _req, res, _next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
