export default function ADID(): Promise<{
    supportive: {
        canvas: boolean;
        textApi: boolean;
        toDataURL: boolean;
    };
    ADID: string;
    message: string;
    spoofed?: undefined;
    spoofedByRandom?: undefined;
    spoofedRandomBefore?: undefined;
    spoofedRandomAfter?: undefined;
} | {
    supportive: {
        canvas: boolean;
        textApi: boolean;
        toDataURL: boolean;
    };
    spoofed: boolean;
    spoofedByRandom: boolean;
    ADID: unknown;
    spoofedRandomBefore: string;
    spoofedRandomAfter: unknown;
    message?: undefined;
}>;
