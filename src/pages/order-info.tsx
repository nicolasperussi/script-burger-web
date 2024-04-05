import { api } from "@/lib/api";
import { IOrder } from "@/types/order.interface";

import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import updateLocale from "dayjs/plugin/updateLocale";
import ptBR from "dayjs/locale/pt-br";

import {
  ChevronLeft,
  Clock,
  DollarSign,
  Home,
  Loader2,
  Plus,
  Truck,
  User,
} from "lucide-react";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { BRL } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CourierContext } from "@/lib/context/couriers-context";
import { ICourier } from "@/types/courier.interface";
import { IProduct } from "@/types/product.interface";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";

dayjs.locale(ptBR);
dayjs.extend(calendar);
dayjs.extend(updateLocale);

dayjs.updateLocale("pt-br", {
  calendar: {
    lastDay: "[Ontem às] HH:mm",
    sameDay: "[Hoje às] HH:mm",
    nextDay: "[Amanhã às] HH:mm",
    lastWeek: "MMMM D, YYYY [às] HH:mm",
    nextWeek: "dddd [às] HH:mm",
    sameElse: "MMMM D, YYYY [às] HH:mm",
  },
});

const columns: ColumnDef<{
  quantity: number;
  totalPrice: number;
  product: IProduct;
}>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="flex gap-4 items-center">
        {/* TODO: add a zoom to the image on hover */}
        <img
          src={`http://localhost:3003/images/${row.original.product.slug}.jpg`}
          className="size-12 rounded-lg object-cover"
        />
        <span>{row.original.product.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
    cell: ({ row }) => (
      <span>
        {row.original.quantity} x {BRL(row.original.product.price)}
      </span>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Valor total",
    cell: ({ row }) => BRL(row.original.totalPrice),
  },
];

function OrderInfo() {
  const { id } = useParams();

  const [order, setOrder] = useState<IOrder | null>(null);

  const { couriers } = useContext(CourierContext);

  function assignCourier(orderId: number | string, courier: ICourier) {
    api
      .patch(`/orders/${orderId}/courier/${courier.id}`)
      .then(() => setOrder({ ...order!, courier }));
  }

  useQuery("orderById", async () => {
    const response = await api.get(`orders/${id}`);
    setOrder(response.data);
    return response;
  });

  return order ? (
    <div className="h-full w-full rounded-lg border flex flex-col">
      <div className="flex-1 border-b flex">
        <div className="flex-1 p-4 border-r flex flex-col gap-4">
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link to={`/orders`}>
                <ChevronLeft className="size-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Pedido nº {order.id}</h1>
            {/* TODO: create stepper for order status */}
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Informações</h1>
          <div className="border rounded-lg flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 border-b flex">
              <div className="flex w-56 items-center px-4 gap-4 border-r bg-foreground/5">
                <User className="size-6" />
                <span className="font-medium">Nome completo</span>
              </div>
              <span className="flex flex-1 items-center px-4">
                {order.client.name}
              </span>
            </div>
            <div className="flex-1 border-b flex">
              <div className="flex w-56 items-center px-4 gap-4 border-r bg-foreground/5">
                <Clock className="size-6" />
                <span className="font-medium">Horário</span>
              </div>
              <span className="flex flex-1 items-center px-4">
                {dayjs(order.moment).calendar()}
              </span>
            </div>
            <div className="flex-1 border-b flex">
              <div className="flex w-56 items-center px-4 gap-4 border-r bg-foreground/5">
                <DollarSign className="size-6" />
                <span className="font-medium">Valor total</span>
              </div>
              <span className="flex flex-1 items-center px-4">
                {BRL(order.totalPrice)}
              </span>
            </div>
            <div className="flex-1 border-b flex">
              <div className="flex w-56 items-center px-4 gap-4 border-r bg-foreground/5">
                <Home className="size-6" />
                <span className="font-medium">Endereço</span>
              </div>
              <span className="flex flex-1 items-center px-4">
                {order.deliveryAddress.street}, {order.deliveryAddress.number} -{" "}
                {order.deliveryAddress.cep}
              </span>
            </div>

            <div className="flex-1 flex">
              <div className="flex w-56 items-center px-4 gap-4 border-r bg-foreground/5">
                <Truck className="size-6" />
                <span className="font-medium">Entregador</span>
              </div>
              {order.courier ? (
                <span className="flex flex-1 items-center px-4">
                  {order.courier.name} - {order.courier.licensePlate}
                </span>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex-1 h-full rounded-none"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Atribuir entregador</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {couriers.map((courier: ICourier) => (
                      <DropdownMenuItem
                        key={courier.id}
                        onClick={() => assignCourier(order.id, courier)}
                        className="cursor-pointer"
                      >
                        <strong>{courier.name}</strong>&nbsp;-&nbsp;
                        {courier.licensePlate}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="p-4 gap-4 flex flex-col flex-1 border-r">
          <h1 className="text-3xl font-bold">Itens do pedido</h1>
          {/* TODO: put DataTable in a ScrollArea */}
          <DataTable columns={columns} data={order.items} />
        </div>
        <div className="h-full w-96 flex flex-col gap-4 p-4">
          <h1 className="text-3xl font-bold">Pagamento</h1>
        </div>
      </div>
    </div>
  ) : (
    <div className="grid place-items-center w-full h-full">
      <Loader2 className="size-32 animate-spin text-border" />
    </div>
  );
}

export default OrderInfo;
