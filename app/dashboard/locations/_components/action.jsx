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

import { useParams } from "next/navigation";
import Link from "next/link";
import { paths } from "@/constants/paths";
import {
  createLocation,
  deleteLocation,
  editLocation,
  getLocationById,
} from "@/actions/location";

const getFormSchema = ({ isEdit, isDelete }) =>
  z.object({
    title: z.string().min(2),
    lng: z.optional(),
    lat: z.optional(),
    imageURL: isEdit || isDelete ? z.string().optional() : z.string(),
    // imageURL:
    //   isEdit || isDelete
    //     ? z.any().optional()
    //     : z
    //         .instanceof(FileList, { message: "Images are required" })
    //         .refine((list) => list.length <= 1, "Only one image is required")
    //         .transform((list) => Array.from(list))
    //         .refine(
    //           (files) => {
    //             const allowedTypes = {
    //               "image/jpeg": true,
    //               "image/png": true,
    //               "image/webp": true,
    //               "image/*": true,
    //             };
    //             return Array.from(files).every(
    //               (file) => allowedTypes[file.type]
    //             );
    //           },
    //           {
    //             message: "Invalid file type. Allowed types: JPG, PNG",
    //           }
    //         )
    //         .refine(
    //           (files) => {
    //             return Array.from(files).every((file) => file.size <= 4);
    //           },
    //           {
    //             message: "File size should not exceed 5MB",
    //           }
    //         ),
  });

const onError = (error) => {
  toast.error(error.response?.data.message ?? "Something went wrong!");
};

const ActionForm = ({ type }) => {
  const isEdit = type === "update";
  const isDelete = type === "delete";

  const { id } = useParams();
  const { data: editItem } = useQuery({
    queryKey: [QUERY_KEYS.LOCATION, id],
    queryFn: () => getLocationById(id),
    enabled: isEdit || isDelete,
  });

  const { mutate: mutateCreate } = useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      toast.success("Location created successfully.");
    },
    onError,
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: editLocation,
    onSuccess: () => {
      toast.success("Location updated successfully.");
      navigate(paths.DASHBOARD.LOCATIONS.LIST);
    },
    onError,
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      toast.success("Location deleted successfully.");
      navigate(paths.DASHBOARD.LOCATIONS.LIST);
    },
    onError,
  });

  const formSchema = useMemo(
    () => getFormSchema({ isEdit, isDelete }),
    [isEdit, isDelete]
  );

  const form = useForm({
    defaultValues: {
      title: "",
      lng: "",
      lat: "",
      imageURL: "",
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (editItem) {
      form.setValue("title", editItem?.title);
      form.setValue("imageURL", editItem?.imageURL);
      form.setValue("lng", editItem?.lng);
      form.setValue("lat", editItem?.lat);
    }
  }, [editItem]);

  function onSubmit(values) {
    const data = {
      title: values.title,
      imageURL: values.imageURL,
      lng: values.lng,
      lat: values.lat,
    };
    if (type === "create") {
      mutateCreate(data);
    } else if (type === "update") {
      mutateUpdate({
        id,
        data,
      });
    } else if (type === "delete") {
      mutateDelete({
        id,
      });
    }
  }

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold  text-green-500 mb-4">
        {isEdit ? "Edit" : isDelete ? "Delete" : "Create"} Location
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      placeholder="Mercedes"
                      {...field}
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
                      placeholder="Longitude"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toString())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="lat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Latitude"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toString())
                      }
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
            <RenderIf condition={isDelete}>
              <Button type="submit" variant={"destructive"} className="mt-4">
                Delete
              </Button>
            </RenderIf>
            <RenderIf condition={!isDelete}>
              <Button asChild variant="secondary">
                <Link
                  href={paths.DASHBOARD.LOCATIONS.LIST}
                  className="hover:scale-105 mr-2  !bg-transparent !text-green-400 !border-green-100 !border"
                >
                  Back
                </Link>
              </Button>
              <Button
                variant={"blacked"}
                type="submit"
                className="border-green-500 border rounded-md hover:scale-105"
              >
                Submit
              </Button>
            </RenderIf>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ActionForm;
