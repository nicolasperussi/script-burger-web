import { BRL, getOrderStatus } from "@/lib/utils";
import { IOrder } from "@/types/order.interface";

import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import relativeTime from "dayjs/plugin/relativeTime";
import ptBR from "dayjs/locale/pt-br";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useQuery } from "react-query";
import { api } from "@/lib/api";
import { twMerge } from "tailwind-merge";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale(ptBR);

interface IColumnOrder {
  id: string | number;
  client: string;
  products: string;
  totalPrice: number;
  moment: Date;
  status: "CANCELED" | "WAITING" | "IN_PRODUCTION" | "IN_TRANSIT" | "DELIVERED";
  courier: string;
  cancelOrder: () => void;
  advanceOrder: () => void;
}

const columns: ColumnDef<IColumnOrder>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => String(row.getValue("id")).padStart(4, "0"),
  },
  {
    accessorKey: "client",
    header: "Cliente",
  },
  {
    accessorKey: "products",
    header: "Produtos",
  },
  {
    accessorKey: "totalPrice",
    header: "Valor do pedido",
    cell: ({ row }) => BRL(parseFloat(row.getValue("totalPrice"))),
  },
  {
    accessorKey: "moment",
    header: "Horário",
    cell: ({ row }) => {
      const date = dayjs(row.getValue("moment"));
      const minuteDifference = date.diff(new Date(), "minute");

      if (minuteDifference > 5) return date.calendar();
      return date.fromNow();
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const order = row.original;
      const status = getOrderStatus(row.getValue("status"));

      return (
        <div className="flex items-center w-">
          <div className="flex gap-2 items-center flex-1">
            <span
              className={twMerge("size-3 rounded-full", status.color)}
            ></span>
            <span>{status.display}</span>
          </div>
          <Dialog>
            <DialogTrigger>
              <Button variant="outline" className="flex gap-2 right-5">
                <span>Avançar</span>
                <ArrowRight className="" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Avançar pedido</DialogTitle>
                <DialogDescription>
                  Deseja avançar o pedido{" "}
                  <strong>{String(order.id).padStart(4, "0")}</strong> para a
                  próxima etapa?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex gap-4">
                <DialogClose asChild>
                  <Button variant="ghost" type="button">
                    Voltar
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={order.advanceOrder} type="button">
                    Avançar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
  {
    accessorKey: "courier",
    header: "Entregador",
    cell: ({ row }) => {
      const order = row.original;
      const courier = order.courier;

      // TODO: Add dropdown to fetch courier and assign them to order
      return !courier ? (
        <Button variant="outline" className="w-full">
          <Plus className="size-4" />
        </Button>
      ) : (
        courier
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-foreground">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DialogTrigger
                disabled={
                  !(order.status !== "CANCELED" && order.status !== "DELIVERED")
                }
                className="w-full"
              >
                <DropdownMenuItem
                  disabled={
                    !(
                      order.status !== "CANCELED" &&
                      order.status !== "DELIVERED"
                    )
                  }
                  className="text-red-400 cursor-pointer flex items-center gap-2"
                >
                  <Trash className="size-4" />
                  <span>Cancelar</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Você tem certeza?</DialogTitle>
              <DialogDescription>
                <strong>Cancelar o pedido</strong> é uma ação que não pode ser
                desfeita. Deseja realmente cancelar o pedido
                <strong> {String(order.id).padStart(4, "0")}</strong>?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-4">
              <DialogClose asChild>
                <Button variant="ghost" type="button">
                  Voltar
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={order.cancelOrder}
                  variant="destructive"
                  type="button"
                >
                  Confirmar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

function Orders() {
  const [orders, setOrders] = useState<Array<IOrder>>([]);
  const { isFetching } = useQuery("orders", async () => {
    const response = await api.get("/orders");
    setOrders(response.data);
    return response.data;
  });

  function advanceOrder(orderId: string | number) {
    api.patch(`/orders/${orderId}`).then(() =>
      setOrders(
        orders.map((order: IOrder) =>
          order.id === orderId
            ? {
                ...order,
                status:
                  order.status === "WAITING"
                    ? "IN_PRODUCTION"
                    : order.status === "IN_PRODUCTION"
                    ? "IN_TRANSIT"
                    : "DELIVERED",
              }
            : order
        )
      )
    );
  }

  function cancelOrder(orderId: string | number) {
    api.patch(`/orders/cancel/${orderId}`).then(() =>
      setOrders(
        orders.map((order: IOrder) =>
          order.id === orderId && order.status !== "DELIVERED"
            ? {
                ...order,
                status: "CANCELED",
              }
            : order
        )
      )
    );
  }

  return (
    <div className="flex flex-col w-full gap-4 h-full">
      <h1 className="text-3xl font-bold">Pedidos</h1>
      <div className="flex gap-3">
        <span>Filtros:</span>
      </div>
      {!isFetching ? (
        <DataTable
          columns={columns}
          data={
            orders
              ? orders.map(
                  (order: IOrder): IColumnOrder => ({
                    id: order.id,
                    client: order.client.name,
                    products:
                      order.items.length > 1
                        ? `${order.items.length} produtos`
                        : `${order.items.length} produto`,
                    totalPrice: order.totalPrice,
                    moment: new Date(order.moment),
                    status: order.status,
                    courier: order.courier?.name,
                    cancelOrder: () => cancelOrder(order.id),
                    advanceOrder: () => advanceOrder(order.id),
                  })
                )
              : []
          }
        />
      ) : (
        <div className="grid place-items-center w-full h-full">
          <Loader2 className="size-32 animate-spin text-border" />
        </div>
      )}
    </div>
  );
}

export default Orders;
