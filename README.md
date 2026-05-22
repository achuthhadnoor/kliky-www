# Kliky WWW

This is the web API and frontend for the Kliky desktop application. It is built with [Next.js](https://nextjs.org).

## License Engine (Polar.sh)

This project contains a License Engine that integrates with [Polar.sh](https://polar.sh) to handle software licensing for the Kliky desktop application. 

The API endpoints act as a secure proxy to the Polar Customer Portal API. This architecture ensures that sensitive organization tokens remain on the server and are never exposed to the client application.

### Configuration

To use the License Engine, you must set the following environment variables in `.env.local`:

```env
POLAR_ACCESS_TOKEN=your_polar_personal_access_token
POLAR_ORGANIZATION_ID=your_polar_organization_id
```

### Endpoints

#### 1. Validate License (`POST /api/license/validate`)
Validates whether a given license key is active and valid.

**Request Body:**
```json
{
  "key": "XXXX-XXXX-XXXX-XXXX"
}
```

#### 2. Activate License (`POST /api/license/activate`)
Activates a license key for a specific device instance (allocation). This is used to track installations per license key.

**Request Body:**
```json
{
  "key": "XXXX-XXXX-XXXX-XXXX",
  "label": "MacBook Pro - User1" // Optional device label
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
