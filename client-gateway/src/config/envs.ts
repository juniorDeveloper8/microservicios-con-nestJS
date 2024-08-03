
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCT_MICROSERVICE_HOST: string;
  PRODUCT_MICROSERVICE_PROT: number;
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PROT: number;
}


const envsSchema = joi.object({

  PORT: joi.number().required(),
  PRODUCT_MICROSERVICE_HOST: joi.string().required(),
  PRODUCT_MICROSERVICE_PROT: joi.number().required(),
  ORDERS_MICROSERVICE_HOST: joi.string().required(),
  ORDERS_MICROSERVICE_PROT: joi.number().required(),
})
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation erro: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  productsMicroServiceHost: envVars.PRODUCT_MICROSERVICE_HOST,
  productsMicroServicePort: envVars.PRODUCT_MICROSERVICE_PROT,
  ordersMicroServiceHost: envVars.ORDERS_MICROSERVICE_HOST,
  ordersMicroServicePort: envVars.ORDERS_MICROSERVICE_PROT
}