export type Result<T> =
    | {
        ok: T,
        error: undefined;
    }
    | {
        ok: undefined;
        error: unknown;
    };

//export function makeSafe<TArgs extends any[], TReturn>(
//    func: (...args: TArgs) => TReturn
//): (...args: TArgs) => Result<TReturn> {
//    return (...args: TArgs): Result<TReturn> => {
//        try {
//            return {
//                value: func(...args),
//                ok: TReturn,
//            };
//        } catch (e) {
//            return {
//                error: e,
//                ok: false,
//            };
//        }
//    };
//}
