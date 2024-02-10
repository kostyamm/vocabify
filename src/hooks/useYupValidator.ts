import { AnyObject, ObjectSchema } from 'yup';
import { useCallback } from 'react';
import { FormInstance } from 'antd';

export const useYupValidator = <T extends AnyObject>(schema: ObjectSchema<T>, form: FormInstance<T>) => {
    const yupSync = {
        /** Use any because there is no way to get the correct type from antd */
        async validator({ field }: any) {
            await schema.validateSyncAt(field, form.getFieldsValue());
        },
    }

    const formValidate = useCallback(async () => {
        return form.validateFields()
            .then(() => true)
            .catch((errors) => {
                console.error(errors);
                return false
            });
    }, [form.getFieldsValue, schema])

    return {
        yupSync,
        formValidate
    }
};