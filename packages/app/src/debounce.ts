export type DebounceableFunction = (...args: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

export const debounce = <TFunction extends DebounceableFunction>(
    func: TFunction,
    wait: number,
    fireImmediately = false
): TFunction => {
    let timeout: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

    const debouncedFunc = function (
        this: ThisParameterType<TFunction>,
        ...args: Parameters<TFunction>[]
    ): void {
        const debounceCallback = (): void => {
            if (!fireImmediately) {
                func.apply(this, args);
            }

            timeout = null;
        };

        if (!timeout) {
            if (fireImmediately) {
                func.apply(this, args);
            }
            timeout = setTimeout(debounceCallback, wait);
        } else {
            clearTimeout(timeout);

            timeout = setTimeout(debounceCallback, wait);
        }
    };

    return debouncedFunc as TFunction;
};
