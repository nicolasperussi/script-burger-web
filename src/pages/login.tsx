import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login, isAuthenticated } from "@/lib/auth";
import { Navigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string(),
});

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values.email, values.password);
  }

  return !isAuthenticated() ? (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-screen h-screen grid place-content-center gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-80">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="E-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-80">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Entrar</Button>
      </form>
    </Form>
  ) : (
    <Navigate to="/orders" />
  );
}

export default Login;
