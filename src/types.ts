import VueI18n from "vue-i18n";
import TranslateResult = VueI18n.TranslateResult;

export interface TargetCurrencyData {
    target: string;
    value: string;
    error: boolean;
    defaultLabel: TranslateResult;
    errorLabel: TranslateResult;
    converting: boolean;
}

export declare const TargetCurrencyData: {
    new(target: string, value: string, error: string, defaultLabel: string, errorLabel: string, converting: string): TargetCurrencyData;
    readonly prototype: TargetCurrencyData;
}

export interface SourceCurrencyData {
    source: string;
    value: string;
    error: boolean;
    defaultLabel: TranslateResult;
    errorLabel: TranslateResult;
}

export declare const SourceCurrencyData: {
    new(source: string, value: string, error: string, defaultLabel: string, errorLabel: string): SourceCurrencyData;
    readonly prototype: SourceCurrencyData;
}
