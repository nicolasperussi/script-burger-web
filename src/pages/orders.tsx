/* eslint-disable react-hooks/rules-of-hooks */
import { BRL, getOrderStatus } from "@/lib/utils";
import { IOrder } from "@/types/order.interface";

import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import relativeTime from "dayjs/plugin/relativeTime";
import ptBR from "dayjs/locale/pt-br";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
} from "lucide-react";
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
import { useContext } from "react";
import { CourierContext } from "@/lib/context/couriers-context";
import { ICourier } from "@/types/courier.interface";
import { Link } from "react-router-dom";
import { OrderContext } from "@/lib/context/orders-context";

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
  assignCourier: (courier: ICourier) => void;
}

const columns: ColumnDef<IColumnOrder>[] = [
  {
    id: "info",
    cell: ({ row }) => (
      <Button asChild variant="outline">
        <Link to={`/order/${row.original.id}`}>
          <Search className="size-4" />
        </Link>
      </Button>
    ),
  },
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
      const minuteDifference = dayjs().diff(date, "minute");

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
        <div className="flex items-center">
          <div className="flex gap-2 items-center flex-1">
            <span
              className={twMerge("size-3 rounded-full", status.color)}
            ></span>
            <span>{status.display}</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
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

      const { couriers } = useContext(CourierContext);

      return !courier ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-full">
            <Button variant="outline" className="w-full">
              <Plus className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Atribuir entregador</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {couriers.map((courier: ICourier) => (
              <DropdownMenuItem
                key={courier.id}
                onClick={() => order.assignCourier(courier)}
                className="cursor-pointer"
              >
                <strong>{courier.name}</strong>&nbsp;-&nbsp;
                {courier.licensePlate}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
  const {
    orders,
    isFetchingOrders,
    handleAdvanceOrder,
    handleCancelOrder,
    handleAssignCourier,
  } = useContext(OrderContext);

  return (
    <div className="flex flex-col w-full gap-4 h-full">
      <h1 className="text-3xl font-bold">Pedidos</h1>
      <div className="flex gap-3">
        <span>Filtros:</span>
      </div>
      {!isFetchingOrders ? (
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
                    cancelOrder: () => handleCancelOrder(order.id),
                    advanceOrder: () => handleAdvanceOrder(order.id),
                    assignCourier: (courier: ICourier) =>
                      handleAssignCourier(order.id, courier),
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
