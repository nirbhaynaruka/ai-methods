/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Secure onboarding keys function
exports.getAllClientSlugs = onRequest(async (request, response) => {
  // Enable CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Methods', 'GET, POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  try {
    logger.info('Fetching all client slugs');
    const clientsSnapshot = await db.collection('clients').get();
    const slugs = clientsSnapshot.docs.map(doc => doc.id);
    logger.info(`Found slugs: ${JSON.stringify(slugs)}`);
    response.json(slugs);
  } catch (error) {
    logger.error('Error fetching client slugs:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

exports.getClientOnboardingData = onRequest(async (request, response) => {
  // Enable CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Methods', 'GET, POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  const slug = request.query.slug;
  if (!slug) {
    response.status(400).json({ error: 'Slug parameter is required' });
    return;
  }

  try {
    logger.info(`Fetching client data for slug: ${slug}`);
    const clientDoc = await db.collection('clients').doc(slug).get();
    logger.info(`Client doc exists: ${clientDoc.exists}`);

    if (clientDoc.exists) {
      const clientData = clientDoc.data();
      logger.info(`Client data: ${JSON.stringify(clientData)}`);
      response.json({
        name: clientData.name,
        key: clientData.key,
        slug: slug,
      });
      return;
    }

    // Client not found in Firestore
    logger.info(`Client not found for slug: ${slug}`);
    response.status(404).json({ error: 'Client not found' });
  } catch (error) {
    logger.error('Error fetching client data:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});
