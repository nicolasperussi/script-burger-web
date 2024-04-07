import { fakerPT_BR as faker } from "@faker-js/faker";
import { api } from "./api";

interface FakeOrder {
  userId: number;
  items: Array<{ productId: number; quantity: number }>;
  address: { cep: string; street: string; number: string };
}

async function createOrder(order: FakeOrder): Promise<void> {
  try {
    const response = await api.post("/orders", order); // Replace 'your-api-endpoint' with your actual API endpoint
    return response.data;
  } catch (error) {
    console.error(`Error making API call for ${order}: ${error}`);
    throw error;
  }
}

export async function seed(): Promise<void> {
  const fakeOrders: Array<FakeOrder> = Array.from({ length: 10 }, () => ({
    userId: faker.number.int({ min: 4, max: 33 }),
    items: [
      {
        productId: faker.number.int({ min: 1, max: 10 }),
        quantity: faker.number.int({ min: 1, max: 3 }),
      },
      {
        productId: faker.number.int({ min: 11, max: 18 }),
        quantity: faker.number.int({ min: 1, max: 3 }),
      },
      {
        productId: faker.number.int({ min: 19, max: 23 }),
        quantity: faker.number.int({ min: 1, max: 3 }),
      },
      {
        productId: faker.number.int({ min: 23, max: 31 }),
        quantity: faker.number.int({ min: 1, max: 3 }),
      },
    ],
    address: {
      cep: faker.location.zipCode(),
      street: faker.location.street(),
      number: faker.location.buildingNumber(),
    },
  }));

  try {
    const promises = fakeOrders.map((order) => createOrder(order));
    await Promise.all(promises);
    console.log("All API calls completed successfully:");
  } catch (error) {
    console.error("Error occurred while making API calls:", error);
    throw error;
  }
}
