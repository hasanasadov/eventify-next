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
import  eventServices  from "@/services/events";
import { useParams } from "next/navigation";
import Link from "next/link";

const getFormSchema = ({ isEdit, isDelete }) =>
  z.object({
    title: z.string().min(2),
    date: z.string().min(2),
    description: z.string().min(2),
    event_type: z.string().min(2),
    start: z.string().min(2),
    finish: z.string().min(2),
    goto: z.string().min(2),

    venue_id: z.string().min(1),
    organizer_id: z.string().min(1),
    poster_image_link: isEdit || isDelete ? z.string().optional() : z.string(),
    // poster_image_link:
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
    queryKey: [QUERY_KEYS.EVENT_COMMENTS, id],
    queryFn: () => eventServices.getEventById(id),
    enabled: isEdit || isDelete,
  });

  const editItem = data?.event || null;
  const editLocation = data?.location || null;
  console.log("data", data);

  // console.log("editItem", editItem);

  // const { mutate: mutateCreate } = useMutation({
  //   mutationFn: createEvent,
  //   onSuccess: () => {
  //     toast.success("Event created successfully.");
  //   },
  //   onError,
  // });

  // const { mutate: mutateUpdate } = useMutation({
  //   mutationFn: rentService.edit,
  //   onSuccess: () => {
  //     toast.success("Rent updated successfully.");
  //     navigate(paths.DASHBOARD.RENTS.LIST);
  //   },
  //   onError,
  // });

  // const { mutate: mutateDelete } = useMutation({
  //   mutationFn: rentService.remove,
  //   onSuccess: () => {
  //     toast.success("Rent deleted successfully.");
  //     navigate(paths.DASHBOARD.RENTS.LIST);
  //   },
  //   onError,
  // });

  const formSchema = useMemo(
    () => getFormSchema({ isEdit, isDelete }),
    [isEdit, isDelete]
  );

  const form = useForm({
    defaultValues: {
      title: "",
      date: "",
      description: "",
      event_type: "",
      start: "",
      finish: "",
      goto: "",
      venue_id: "",
      organizer_id: "",
      poster_image_link: "",
      lat: "",
      lng: "",
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (editItem) {
      form.setValue("title", editItem?.title);
      form.setValue("poster_image_link", editItem?.poster_image_link);
      form.setValue("date", editItem?.date);
      form.setValue("description", editItem?.description);
      form.setValue("event_type", editItem?.event_type);
      form.setValue("start", editItem?.start);
      form.setValue("finish", editItem?.finish);
      form.setValue("goto", editItem?.goto);
      form.setValue("venue_id", editItem?.venue_id);
      form.setValue("organizer_id", editItem?.organizer_id);
      form.setValue("lat", editLocation?.lat);
      form.setValue("lng", editLocation?.lng);
    }
  }, [editItem]);

  function onSubmit(values) {
    const data = {
      title: values.title,
      poster_image_link: values.poster_image_link,
      date: values.date,
      description: values.description,
      event_type: values.event_type,
      start: values.start,
      finish: values.finish,
      goto: values.goto,
      venue_id: values.venue_id,
      organizer_id: values.organizer_id,
      lat: values.lat,
      lng: values.lng,
    };

    console.log(data);
    // if (type === "create") {
    //   mutateCreate(data);
    // } else if (type === "update") {
    //   mutateUpdate({
    //     id,
    //     data,
    //   });
    // } else if (type === "delete") {
    //   mutateDelete({
    //     id,
    //   });
    // }
  }

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold  text-orange-600 mb-4">
        {isEdit ? "Edit" : isDelete ? "Delete" : "Create"} Event
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="date"
                      placeholder="2025-01-27"
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
              name="event_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Event Type"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="time"
                      placeholder="Start"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="finish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Finish</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="time"
                      placeholder="Finish"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goto</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Goto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="venue_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue ID</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Venue ID"
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
              name="organizer_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizer ID</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Organizer ID"
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
              name="poster_image_link"
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
              name="poster_image_link"
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
            condition={
              !!editItem?.poster_image_link && !!form.watch("poster_image_link")
            }
          >
            <div className="mt-4">
              <h4>Existing Image</h4>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                <RenderIf condition={!!editItem}>
                  <img
                    src={editItem?.poster_image_link}
                    alt="Event Image"
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
                <Link href="/dashboard/events" className="mr-2">
                  Back
                </Link>
              </Button>
              <Button
                variant={"blacked"}
                type="submit"
                className="border-orange-600 border rounded-md"
              >
                Submittt
              </Button>
            </RenderIf>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ActionForm;
