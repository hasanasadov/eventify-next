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
import { RenderIf } from "@/utils/RenderIf";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { paths } from "@/constants/paths";
import {
  createLocation,
  deleteLocation,
  editLocation,
  getLocationById,
} from "@/actions/location";

// -------- schema --------
const getFormSchema = ({ isEdit, isDelete }) =>
  z.object({
    title: z.string().min(2, "Title is required"),
    lng: z.string().optional(),
    lat: z.string().optional(),
    imageURL:
      isEdit || isDelete
        ? z.string().optional()
        : z.string().min(1, "Image is required"),
  });

const onError = (error) => {
  toast.error(error?.response?.data?.message ?? "Something went wrong!");
};

const ActionForm = ({ type }) => {
  const isEdit = type === "update";
  const isDelete = type === "delete";

  const { id } = useParams();
  const router = useRouter();

  const { data: editItem, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.LOCATION, id],
    queryFn: () => getLocationById(id),
    enabled: Boolean((isEdit || isDelete) && id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const formSchema = useMemo(
    () => getFormSchema({ isEdit, isDelete }),
    [isEdit, isDelete]
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      lng: "",
      lat: "",
      imageURL: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (editItem) {
      form.reset({
        title: editItem.title ?? "",
        imageURL: editItem.imageURL ?? "",
        lng:
          editItem.lng !== undefined && editItem.lng !== null
            ? String(editItem.lng)
            : "",
        lat:
          editItem.lat !== undefined && editItem.lat !== null
            ? String(editItem.lat)
            : "",
      });
    }
  }, [editItem, form]);

  const { mutate: mutateCreate, isPending: creating } = useMutation({
    mutationFn: createLocation,
    onSuccess: async () => {
      toast.success("Location created successfully.");
      router.push(paths.DASHBOARD.LOCATIONS.LIST);
    },
    onError,
  });

  const { mutate: mutateUpdate, isPending: updating } = useMutation({
    mutationFn: editLocation,
    onSuccess: async () => {
      toast.success("Location updated successfully.");
      router.push(paths.DASHBOARD.LOCATIONS.LIST);
    },
    onError,
  });

  const { mutate: mutateDelete, isPending: deleting } = useMutation({
    mutationFn: deleteLocation,
    onSuccess: async () => {
      toast.success("Location deleted successfully.");
      router.push(paths.DASHBOARD.LOCATIONS.LIST);
    },
    onError,
  });

  function onSubmit(values) {
    const parsedLng = values.lng?.trim() ? parseFloat(values.lng) : undefined;
    const parsedLat = values.lat?.trim() ? parseFloat(values.lat) : undefined;

    const data = {
      title: values.title,
      imageURL: values.imageURL || "",
      lng: parsedLng,
      lat: parsedLat,
    };

    if (type === "create") {
      mutateCreate(data);
    } else if (type === "update") {
      mutateUpdate({ id, data });
    } else if (type === "delete") {
      if (confirm("Are you sure you want to delete this location?")) {
        mutateDelete({ id });
      }
    }
  }

  const isBusy = creating || updating || deleting || isFetching;
  const allDisabled = isBusy || isDelete; // <<— delete modunda hər şey disable

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-green-500 mb-4">
        {isEdit ? "Edit" : isDelete ? "Delete" : "Create"} Location
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          // isBusy olanda opacity, amma yalnız isBusy && !isDelete halında pointer-events-i bağla
          className={`${isBusy ? "opacity-75" : ""} ${
            isBusy && !isDelete ? "pointer-events-none" : ""
          }`}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Location title"
                      {...field}
                      disabled={allDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lng"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="number"
                      step="any"
                      placeholder="e.g. 49.8671"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      disabled={allDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="number"
                      step="any"
                      placeholder="e.g. 40.4093"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      disabled={allDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="text"
                      placeholder="Image URL"
                      {...field}
                      disabled={allDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <RenderIf
            condition={!!editItem?.imageURL && !!form.watch("imageURL")}
          >
            <div className="mt-4">
              <h4>Existing Image</h4>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                <RenderIf condition={!!editItem}>
                  <img
                    src={editItem?.imageURL}
                    alt="Location Image"
                    className="w-full object-cover rounded-lg"
                  />
                </RenderIf>
              </div>
            </div>
          </RenderIf>

          <div className="flex justify-end mt-4">
            {/* Delete modunda yalnız Delete düyməsi görünsün və aktiv olsun */}
            <RenderIf condition={isDelete}>
              <Button
                type="submit"
                variant="destructive"
                className="mt-4"
                disabled={deleting || isFetching} // yalnız async prosesdə disable
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </RenderIf>

            {/* Delete DEYİLSƏ Back + Submit */}
            <RenderIf condition={!isDelete}>
              <Button asChild variant="secondary" disabled={isBusy}>
                <Link
                  href={paths.DASHBOARD.LOCATIONS.LIST}
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
                {creating || updating ? "Saving..." : "Submit"}
              </Button>
            </RenderIf>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ActionForm;
