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
exports.getClientOnboardingData = onRequest((request, response) => {
  // Enable CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  // Map client slugs to their access credentials and display name.
  const clientOnboardingMap = {
    // Example Client 1: BITYOG - Access Key: yoga4ai
    'bityog': {
      key: 'yoga4ai', // The password the client will use for access
      name: 'BITYOG FITNESS',
    },
    // Example Client 2: A hypothetical client - Access Key: healthai2025
    'medcorp': {
      key: 'healthai2025',
      name: 'MedCorp Diagnostics',
    },
    // Add new clients here as needed:
    // 'newclient': {
    //   key: 'securekey123',
    //   name: 'New Client Enterprises',
    // },
  };

  const slug = request.query.slug;
  if (!slug) {
    response.status(400).json({ error: 'Slug parameter is required' });
    return;
  }

  const data = clientOnboardingMap[slug];
  if (data) {
    response.json({
      name: data.name,
      key: data.key,
      slug: slug,
    });
  } else {
    response.status(404).json({ error: 'Client not found' });
  }
});
