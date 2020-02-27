export default function ADID(): Promise<{
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
}>;
