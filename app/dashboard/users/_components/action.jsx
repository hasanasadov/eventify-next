// app/(dashboard)/dashboard/users/_components/UserActionForm.jsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { paths } from "@/constants/paths";
import {
  deleteUser,
  editUser,
  getUserById,
  setUserRoleAction,
} from "@/actions/users";

// -------- schema --------
const getFormSchema = ({ isEdit, isDelete }) =>
  z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().optional().nullable(),
    email: z.string().email("Invalid email"),
    role: z.enum(["USER", "ADMIN", "ORGANISER"]).optional(), // form sahəsi olaraq göstərəcəyik
  });

const onError = (error) => {
  toast.error(error?.message ?? "Something went wrong!");
};

const UserActionForm = ({ type }) => {
  const isEdit = type === "update";
  const isDelete = type === "delete";

  const { id } = useParams();
  const router = useRouter();

  const { data: editItem, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.USERS, id],
    queryFn: () => getUserById(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  console.log("editItem", editItem);

  const formSchema = useMemo(
    () => getFormSchema({ isEdit, isDelete }),
    [isEdit, isDelete]
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      role: "USER",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (editItem) {
      form.reset({
        name: editItem.name ?? "",
        username: editItem.username ?? "",
        email: editItem.email ?? "",
        role: editItem.role ?? "USER",
      });
    }
  }, [editItem, form]);

  const { mutate: mutateUpdate, isPending: updating } = useMutation({
    mutationFn: editUser,
    onSuccess: async () => {
      toast.success("User updated successfully.");
      router.push(paths.DASHBOARD.USERS.LIST);
    },
    onError,
  });

  const { mutate: mutateDelete, isPending: deleting } = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      toast.success("User deleted successfully.");
      router.push(paths.DASHBOARD.USERS.LIST);
    },
    onError,
  });

  const { mutate: mutateRole, isPending: changingRole } = useMutation({
    mutationFn: setUserRoleAction,
    onSuccess: async () => {
      toast.success("Role changed successfully.");
      router.push(paths.DASHBOARD.USERS.LIST);
    },
    onError,
  });

  function onSubmit(values) {
    if (type === "update") {
      const data = {
        name: values.name,
        username: values.username || null,
        email: values.email,
        role: values.role, // istəsən burada saxlamaya da bilərsən, ayrı düymələrlə də dəyişirik
      };
      mutateUpdate({ id, data });
    } else if (type === "delete") {
      if (confirm("Are you sure you want to delete this user?")) {
        mutateDelete({ id });
      }
    }
  }

  const isBusy = updating || deleting || changingRole || isFetching;

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-green-500 mb-4">
        {isEdit ? "Edit" : isDelete ? "Delete" : "Create"} User
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={isBusy ? "opacity-75 pointer-events-none" : ""}
        >
          {/* Fields */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="username (optional)"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <select
                      className="bg-transparent border rounded h-10 px-2"
                      {...field}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="ORGANISER">ORGANISER</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          {/* Footer buttons */}
          <div className="flex justify-end mt-4">
            {isDelete ? (
              <Button
                type="submit"
                variant="destructive"
                className="mt-4"
                disabled={isBusy}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            ) : (
              <>
                <Button asChild variant="secondary" disabled={isBusy}>
                  <Link
                    href={paths?.DASHBOARD?.USERS?.LIST || "/dashboard/users"}
                    className="hover:scale-105 mr-2 !bg-transparent !text-green-400 !border-green-100 !border"
                  >
                    Back
                  </Link>
                </Button>
                <Button
                  variant="blacked"
                  type="submit"
                  className="border-green-500 border rounded-md hover:scale-105"
                  disabled={isBusy}
                >
                  {updating ? "Saving..." : "Save"}
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserActionForm;
