export interface IClient {
  id: number;
  name: string;
  email: string;
  phone: string;
  addresses: [
    {
      cep: string;
      street: string;
      number: string;
    }
  ];
}
