import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({ path: 'config.env' });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .default('production')
      .valid('production', 'development', 'test')
      .default('development'),
    PORT: Joi.number().default(9500),
    DATABASE_CONNECTION: Joi.string().default('mongodb+srv://kmcnarola:7chQ7CSRCeX2UySS@ecommerceapi.7xtl8sh.mongodb.net/?retryWrites=true&w=majority').description('MongoDB URL'),
    DATABASE_PASSWORD: Joi.string().default('7chQ7CSRCeX2UySS').description('MongoDB Password'),
    JWT_SECRET: Joi.string().default('WuZ8o56iFspG3qEQZHOfjdf2GWYafs1WQIjPuV0KMYkVOFpO+htpTFqnC4OB3mRpBG6jSwj8cWFzYyjzoAe3/Ax2ATkWZJIiKxAQwWxdqwL1hA8+ZcgqkEhcf2/dpC03SX+2H3vKvXdH7wqky6UMD7iVFq5hCDoWdT2v5+SxVtzCSL90ecA8lFBlUzhSSuF81rWpVbUQYjIv6fQQTUCpXwuYFyhck4bTtGIgFZeIEDr97NTJFhX8Zs/JTMYPKUCsxbzkScP3rikn7uV1avuOa2JnGe0o5nY5TKzkum6S26QebkiogWfU3AVoD7Zsl9YSxZMnCHKkCQastqOYMxxhCw==').description('JWT Secret Key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('Minutes After Which Access Tokens Expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('Days After Which Refresh Tokens Expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('Minutes After Which Reset Password Token Expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('Minutes After Which Verify Email Token Expires'),
    CLIENT_EMAIL: Joi.string().description('Gmail Client Email'),
    CLIENT_ID: Joi.string().description('Gmail Client ID'),
    CLIENT_SECRET: Joi.string().description('Gmail Client Secret'),
    REDIRECT_URI: Joi.string().description('Gmail Redirect URI'),
    REFRESH_TOKEN: Joi.string().description('Gmail Refresh Token'),
    CLOUD_NAME: Joi.string().default('dq2ofhn3c').description('Cloudinary Storage Name'),
    CLOUD_API_KEY: Joi.string().default('439211516184881').description('Cloudinary Api Key'),
    CLOUD_API_SECRET: Joi.string().default('DLX45IazQbub9wbWMfl350AbKIM').description('Cloudinary Api Secret'),
    CLOUD_PROJECT: Joi.string().description('Projct Folder'),
    STRIPE_SECRET_KEY: Joi.string().default('sk_test_51LxlTbHPadtB9MkIgVg7AYkBeqOiDTgASc1QZVskHqPmETVyM3l6HaE4O3PaoWJoUQw3NwdxJS0jZppu3bveshir00Z9UopsBg').description('Stripe Secret Key')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}


const config = {
  env: envVars.NODE_ENV,
  server: {
    port: envVars.PORT
  },
  db: {
    url: envVars.DATABASE_CONNECTION,
    password: envVars.DATABASE_PASSWORD
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: 57657,
    refreshExpirationDays: 20,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  },
  email: {
    from: envVars.CLIENT_EMAIL,
    client: {
      id: envVars.CLIENT_ID,
      secret: envVars.CLIENT_SECRET
    },
    RedirectUri: envVars.REDIRECT_URI,
    RefreshToken: envVars.REFRESH_TOKEN
  },
  cloud: {
    name: envVars.CLOUD_NAME,
    api_key: envVars.CLOUD_API_KEY,
    api_secret: envVars.CLOUD_API_SECRET,
    project: envVars.CLOUD_PROJECT
  },
  stripe: {
    secret_key: envVars.STRIPE_SECRET_KEY
  }
};

export default config;
