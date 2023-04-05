import currency from 'currency.js';

export const BRL = (value: string | number): string =>
	currency(value, { symbol: 'R$', decimal: ',', separator: '.' }).format();
