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
import { RenderIf } from "@/components/shared/RenderIf";
import { QUERY_KEYS } from "@/constants/queryKeys";
import eventServices from "@/services/events";
import { useParams } from "next/navigation";
import Link from "next/link";
import { paths } from "@/constants/paths";
import venueServices from "@/services/venues";

// description: "The Baku Crystal Hall is a modern multi-functional indoor arena in Baku, Azerbaijan, known for hosting events such as the Eurovision Song Contest 2012 and various sports and cultural events.";
// id: 1;
// image_1_link: "https://cdn.pbilet.com/origin/d8e57e62-ba3a-4d14-85df-38281f780f53.webp";
// image_2_link: null;
// image_3_link: null;
// lat: "40.34422108008709";
// lng: "49.850154753418984";
// name: "Crystall Hall ";
// num_likes: 0;
// venue_type: "cultural_space";
// work_hours_close: "00:00:00";
// work_hours_open: "09:00:00";

const getFormSchema = ({ isEdit, isDelete }) =>
  z.object({
    name: z.string().min(2),
    description: z.string().min(2),
    venue_type: z.string().min(2),
    work_hours_open: z.string().min(2),
    work_hours_close: z.string().min(2),
    id: z.string().min(2),

    lat: z.string().min(1),
    lng: z.string().min(1),
    image_1_link: isEdit || isDelete ? z.string().optional() : z.string(),
    // image_1_link:
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
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.VENUE_COMMENTS, id],
    queryFn: () => venueServices.getVenueById(id),
    enabled: isEdit || isDelete,
  });

  const editItem = data || null;
  console.log("data", data);

  const { mutate: mutateCreate } = useMutation({
    mutationFn: eventServices.createEvent,
    onSuccess: () => {
      toast.success("Venue created successfully.");
    },
    onError,
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: eventServices.edit,
    onSuccess: () => {
      toast.success("Venue updated successfully.");
      navigate(paths.DASHBOARD.EVENTS.LIST);
    },
    onError,
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: eventServices.remove,
    onSuccess: () => {
      toast.success("Venue deleted successfully.");
      navigate(paths.DASHBOARD.VENUES.LIST);
    },
    onError,
  });

  const formSchema = useMemo(
    () => getFormSchema({ isEdit, isDelete }),
    [isEdit, isDelete]
  );

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      venue_type: "",
      work_hours_open: "",
      work_hours_close: "",
      id: "",
      lat: "",
      lng: "",
      image_1_link: "",
      lat: "",
      lng: "",
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (editItem) {
      form.setValue("name", editItem?.name);
      form.setValue("image_1_link", editItem?.image_1_link);
      form.setValue("description", editItem?.description);
      form.setValue("venue_type", editItem?.venue_type);
      form.setValue("work_hours_open", editItem?.work_hours_open);
      form.setValue("work_hours_close", editItem?.work_hours_close);
      form.setValue("id", editItem?.id);
      form.setValue("lat", editItem?.lat);
      form.setValue("lng", editItem?.lng);
      form.setValue("lat", data?.lat);
      form.setValue("lng", data?.lng);
    }
  }, [editItem]);

  function onSubmit(values) {
    const data = {
      name: values.name,
      image_1_link: values.image_1_link,
      description: values.description,
      venue_type: values.venue_type,
      work_hours_open: values.work_hours_open,
      work_hours_close: values.work_hours_close,
      id: values.id,
      lat: values.lat,
      lng: values.lng,
      lat: values.lat,
      lng: values.lng,
    };

    console.log(data);
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
        {isEdit ? "Edit" : isDelete ? "Delete" : "Create"} Venue
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="venue_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue Type</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Venue Type"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="work_hours_open"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work hours open</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="time"
                      placeholder="work_hours_open"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="work_hours_close"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work hours close</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="time"
                      placeholder="work_hours_close"
                      {...field}
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
                  <FormLabel>Latitute</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Latitute"
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
              name="lng"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lengitute</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Lengitute"
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
            />

            {/* <FormField
              control={form.control}
              name="image_1_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      multiple
                      type="file"
                      onChange={(e) => {
                        field.onChange(e.target.files);
                      }}
                      accept="image/*"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="image_1_link"
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
            condition={!!editItem?.image_1_link && !!form.watch("image_1_link")}
          >
            <div className="mt-4">
              <h4>Existing Image</h4>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                <RenderIf condition={!!editItem}>
                  <img
                    src={editItem?.image_1_link}
                    alt="Venus Image"
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
                  href={paths.DASHBOARD.VENUES.LIST}
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
