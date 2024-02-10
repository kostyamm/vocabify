import { AnyObject, ObjectSchema } from 'yup';

export const yupValidator = <T extends AnyObject>(schema: ObjectSchema<T>, getFieldsValue: () => T) => {
    const yupSync = {
        /** Use any because there is no way to get the correct type from antd */
        async validator({ field }: any) {
            await schema.validateSyncAt(field, getFieldsValue());
        },
    }

    return {
        yupSync
    }
};