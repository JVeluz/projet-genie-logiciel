import Application from "../models/Application";

export function WithLoading() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const application: Application = Application.getInstance();
            try {
                application.loading.set(true);
                return await method.apply(this, args);
            } catch (error) {
                throw error;
            } finally {
                application.loading.set(false);
            }
        };
        return descriptor;
    };
}