import EnhancedEmitter from "./EnhancedEmitter";
import { Currency, StandardEvents } from "./types";
export declare class SDK extends EnhancedEmitter<StandardEvents, {}> {
    #private;
    set endpoint(url: string);
    get endpoint(): string;
    set locale(locale: string | Intl.Locale);
    get locale(): Intl.Locale;
    get APILocale(): string;
    set currency(currency: Currency);
    get currency(): Currency;
    constructor();
    configure(config: {
        locale: Intl.BCP47LanguageTag;
        currency: Currency;
        endpoint: string;
        useCurrencyInLocale?: boolean;
    }): void;
    callAction<T>(actionName: string, payload: unknown, query?: {
        [key: string]: string | number;
    }): Promise<T>;
    getPage<T>(path: string): Promise<T>;
}
