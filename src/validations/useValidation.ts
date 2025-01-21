import { Form, Field } from 'vee-validate';
import { schemas } from './schemas';
import type { ObjectSchema } from 'yup';

type SchemaKeys = keyof typeof schemas;

export default function useValidation<T extends SchemaKeys>(
  schemaName: T
): {
  Form: typeof Form;
  Field: typeof Field;
  schema: ObjectSchema<any>;
} {
  const getSchema = () => {
    return schemas[schemaName] || null;
  };

  return {
    Form,
    Field,
    schema: getSchema()
  };
}