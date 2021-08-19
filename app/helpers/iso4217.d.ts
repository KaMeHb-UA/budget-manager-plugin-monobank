type Currencies = typeof import('iso4217/iso4217.json');

export default function iso4217<Code extends keyof Currencies>(code: Code): Currencies[Code];

export function getByCode(code: string): Currencies[keyof Currencies];
