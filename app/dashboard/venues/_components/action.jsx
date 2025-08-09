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
import eventServices from "@/actions/events";
import { useParams } from "next/navigation";
import Link from "next/link";
import { paths } from "@/constants/paths";
import venueServices, {
  createVenue,
  deleteVenue,
  editVenue,
} from "@/actions/venues";

// description: "The Baku Crystal Hall is a modern multi-functional indoor arena in Baku, Azerbaijan, known for hosting events such as the Eurovision Song Contest 2012 and various sports and cultural events.";
// id: 1;
// imageURL: "https://cdn.pbilet.com/origin/d8e57e62-ba3a-4d14-85df-38281f780f53.webp";
// image_2_link: null;
// image_3_link: null;
// lat: "40.34422108008709";
// lng: "49.850154753418984";
// title: "Crystall Hall ";
// num_likes: 0;
// type: "cultural_space";
// closeAT: "00:00:00";
// openAT: "09:00:00";

const getFormSchema = ({ isEdit, isDelete }) =>
  z.object({
    title: z.string().min(2),
    description: z.string().min(2),
    type: z.string().min(2),
    openAT: z.string().min(2),
    closeAT: z.string().min(2),
    id: z.string().min(2),

    lat: z.string().min(1),
    lng: z.string().min(1),
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
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.VENUE_COMMENTS, id],
    queryFn: () => venueServices.getVenueById(id),
    enabled: isEdit || isDelete,
  });

  const editItem = data || null;

  const { mutate: mutateCreate } = useMutation({
    mutationFn: createVenue,
    onSuccess: () => {
      toast.success("Venue created successfully.");
    },
    onError,
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: editVenue,
    onSuccess: () => {
      toast.success("Venue updated successfully.");
      navigate(paths.DASHBOARD.EVENTS.LIST);
    },
    onError,
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteVenue,
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
      title: "",
      description: "",
      type: "",
      openAT: "",
      closeAT: "",
      imageURL: "",
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (editItem) {
      form.setValue("title", editItem?.title);
      form.setValue("imageURL", editItem?.imageURL);
      form.setValue("description", editItem?.description);
      form.setValue("type", editItem?.type);
      form.setValue("openAT", editItem?.openAT);
      form.setValue("closeAT", editItem?.closeAT);
    }
  }, [editItem]);

  function onSubmit(values) {
    const data = {
      name: values.name,
      imageURL: values.imageURL,
      description: values.description,
      type: values.type,
      openAT: values.openAT,
      closeAT: values.closeAT,
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
        {isEdit ? "Edit" : isDelete ? "Delete" : "Create"} Venue
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
              name="type"
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
              name="openAT"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work hours open</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="time"
                      placeholder="openAT"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="closeAT"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work hours close</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="time"
                      placeholder="closeAT"
                      {...field}
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
