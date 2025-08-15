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
import {
  createEvent,
  deleteEvent,
  editEvent,
  getEventById,
} from "@/actions/events";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { paths } from "@/constants/paths";
import { toDateTimeLocal, toTimeInput } from "@/utils/toTimeInput";
import CommentsSection from "@/components/sections/CommentsSection";
import {
  createEventComment,
  deleteEventComment,
  deleteEventCommentDashboard,
} from "@/actions/comments";

const getFormSchema = ({ isEdit, isDelete }) =>
  z.object({
    title: z.string().trim().min(2, "Title is required"),
    description: z.string().trim().min(2, "Description is required"),
    type: z.string().trim().min(2, "Event type is required"),
    start: z.string().trim().optional().or(z.literal("")),
    end: z.string().trim().optional().or(z.literal("")),
    date: z
      .string()
      .min(2, "Date is required")
      .refine((v) => !Number.isNaN(new Date(v).getTime()), "Invalid date"),
    goto: z.string().trim().min(2, "Goto (link/slug) is required"),
    venueId: z.string().trim().optional().or(z.literal("")),
    locationId: z.string().trim().optional().or(z.literal("")),
    imageURL:
      isEdit || isDelete
        ? z.string().trim().optional()
        : z.string().trim().min(1, "Image is required"),
  });

const onError = (error) => {
  toast.error(error?.response?.data?.message ?? "Something went wrong!");
};

const ActionForm = ({ type }) => {
  const isEdit = type === "update";
  const isDelete = type === "delete";

  const { id } = useParams();
  const router = useRouter();

  const {
    data: editItem,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.EVENT_BY_ID, id],
    queryFn: () => getEventById(id),
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
      description: "",
      type: "",
      start: "",
      end: "",
      date: "",
      goto: "",
      venueId: "",
      locationId: "",
      imageURL: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (editItem) {
      form.reset({
        title: editItem.title ?? "",
        description: editItem.description ?? "",
        type: editItem.type ?? "",
        start: toTimeInput(editItem.start),
        end: toTimeInput(editItem.end),
        date: toDateTimeLocal(editItem.date),
        goto: editItem.goto ?? "",
        venueId: editItem.venueId ?? "",
        locationId: editItem.locationId ?? "",
        imageURL: editItem.imageURL ?? "",
      });
    }
  }, [editItem, form]);

  const { mutate: mutateCreate, isPending: creating } = useMutation({
    mutationFn: createEvent,
    onSuccess: async () => {
      toast.success("Event created successfully.");
      router.push(paths.DASHBOARD.EVENTS.LIST);
    },
    onError,
  });

  const { mutate: mutateUpdate, isPending: updating } = useMutation({
    mutationFn: editEvent,
    onSuccess: async () => {
      toast.success("Event updated successfully.");
      router.push(paths.DASHBOARD.EVENTS.LIST);
    },
    onError,
  });

  const { mutate: mutateDelete, isPending: deleting } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: async () => {
      toast.success("Event deleted successfully.");
      router.push(paths.DASHBOARD.EVENTS.LIST);
    },
    onError,
  });

  function onSubmit(values) {
    const payload = {
      title: values.title,
      description: values.description,
      type: values.type,
      start: values.start || undefined,
      end: values.end || undefined,
      date: new Date(values.date),
      goto: values.goto,
      venueId: values.venueId || undefined,
      locationId: values.locationId || undefined,
      imageURL: values.imageURL || "",
    };

    if (type === "create") {
      mutateCreate(payload);
    } else if (type === "update") {
      mutateUpdate({ id, data: payload });
    } else if (type === "delete") {
      if (confirm("Are you sure you want to delete this event?")) {
        mutateDelete({ id });
      }
    }
  }

  const isBusy = creating || updating || deleting || isFetching;
  const allDisabled = isBusy || isDelete; // <<— delete modunda hər şey disable

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-green-500 mb-4">
        {isEdit ? "Edit" : isDelete ? "Delete" : "Create"} Event
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
                      placeholder="Mercedes"
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date & Time</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="datetime-local"
                      placeholder="2025-01-01T12:00"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Description"
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Event Type"
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
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start (optional)</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="time"
                      placeholder="Start"
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
              name="end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End (optional)</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="time"
                      placeholder="End"
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
              name="goto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goto</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Slug or URL"
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
              name="venueId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue ID (optional)</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Venue ID"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toString())
                      }
                      disabled={allDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location ID (optional)</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="Location ID"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toString())
                      }
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
            condition={Boolean(editItem?.imageURL && form.watch("imageURL"))}
          >
            <div className="mt-4">
              <h4 className="mb-2">Existing Image</h4>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                <RenderIf condition={!!editItem?.imageURL}>
                  <img
                    src={editItem?.imageURL}
                    alt="Event Image"
                    className="w-full aspect-video object-cover rounded-lg border"
                  />
                </RenderIf>
              </div>
            </div>
          </RenderIf>

          <div className="flex justify-end mt-4">
            {/* DELETE mode: yalnız Delete düyməsi aktiv */}
            <RenderIf condition={isDelete}>
              <Button
                type="submit"
                variant="destructive"
                className="mt-4"
                disabled={deleting || isFetching}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </RenderIf>

            {/* Yoxsa: Back + Submit */}
            <RenderIf condition={!isDelete}>
              <Button asChild variant="secondary" disabled={isBusy}>
                <Link
                  href={paths.DASHBOARD.EVENTS.LIST}
                  className="hover:scale-105 mr-2 !bg-transparent !text-green-400 !border-green-100 !border"
                >
                  Back
                </Link>
              </Button>
              <Button
                variant="blacked"
                type="submit"
                disabled={isBusy}
                className="border-green-500 border rounded-md hover:scale-105"
              >
                {creating || updating ? "Saving..." : "Submit"}
              </Button>
            </RenderIf>
          </div>
        </form>
      </Form>
      <div className="py-4">
        <CommentsSection
          initialComments={editItem?.Comment}
          isError={isError}
          isLoading={isFetching}
          hookOptions={{
            resourceId: id,
            parentField: "eventId",
            createFn: createEventComment,
            deleteFn: deleteEventComment,
            invalidateKey: [QUERY_KEYS.EVENT_BY_ID, id],
          }}
          title="Comments"
        />
      </div>
    </div>
  );
};

export default ActionForm;
