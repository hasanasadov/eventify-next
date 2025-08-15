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
  createVenue,
  deleteVenue,
  editVenue,
  getVenueById,
} from "@/actions/venues";
import { toTimeInput } from "@/utils/toTimeInput";
import CommentsSection from "@/components/sections/CommentsSection";
import { createVenueComment, deleteVenueComment } from "@/actions/comments";

// Zod schema
const getFormSchema = ({ isEdit, isDelete }) =>
  z.object({
    title: z.string().min(2, "Title is required"),
    description: z.string().min(2, "Description is required"),
    type: z.string().optional().or(z.literal("")),
    openAT: z.string().optional().or(z.literal("")),
    closeAT: z.string().optional().or(z.literal("")),
    imageURL:
      isEdit || isDelete
        ? z.string().optional()
        : z.string().min(1, "Image is required"),
    locationId: z.string().optional().or(z.literal("")),
    // Text input olduğu üçün string kimi saxlayırıq (vergüllə ayrılmış id-lər)
    events: z.string().optional().or(z.literal("")),
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
    queryKey: [QUERY_KEYS.VENUE_BY_ID, id],
    queryFn: () => getVenueById(id),
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
      openAT: "",
      closeAT: "",
      imageURL: "",
      locationId: "",
      events: "", // string (comma-separated) — əvvəl [] idi
    },
    mode: "onSubmit",
  });

  // Populate for edit/delete
  useEffect(() => {
    if (editItem) {
      form.reset({
        title: editItem.title ?? "",
        description: editItem.description ?? "",
        type: editItem.type ?? "",
        openAT: toTimeInput(editItem.openAT) ?? "",
        closeAT: toTimeInput(editItem.closeAT) ?? "",
        imageURL: editItem.imageURL ?? "",
        locationId: editItem.locationId ?? "",
        // mövcud event id-ləri vergüllə ayrılmış string kimi göstərək
        events: Array.isArray(editItem.events)
          ? editItem.events.map((e) => String(e.id)).join(",")
          : "",
      });
    }
  }, [editItem, form]);

  const { mutate: mutateCreate, isPending: creating } = useMutation({
    mutationFn: createVenue,
    onSuccess: async () => {
      toast.success("Venue created successfully.");
      router.push(paths.DASHBOARD.VENUES.LIST);
    },
    onError,
  });

  const { mutate: mutateUpdate, isPending: updating } = useMutation({
    mutationFn: editVenue,
    onSuccess: async () => {
      toast.success("Venue updated successfully.");
      router.push(paths.DASHBOARD.VENUES.LIST);
    },
    onError,
  });

  const { mutate: mutateDelete, isPending: deleting } = useMutation({
    mutationFn: deleteVenue,
    onSuccess: async () => {
      toast.success("Venue deleted successfully.");
      router.push(paths.DASHBOARD.VENUES.LIST);
    },
    onError,
  });

  function onSubmit(values) {
    // "events" text inputunu vergüllə ayrılmış ID-lərə çeviririk
    const eventIds = (values.events || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: values.title,
      description: values.description,
      type: values.type || undefined,
      openAT: values.openAT || undefined,
      closeAT: values.closeAT || undefined,
      imageURL: values.imageURL || "",
      locationId: values.locationId?.trim()
        ? values.locationId.trim()
        : undefined,
      eventIds,
    };

    if (type === "create") {
      mutateCreate(payload);
    } else if (type === "update") {
      mutateUpdate({ id, data: payload });
    } else if (type === "delete") {
      if (confirm("Are you sure you want to delete this venue?")) {
        mutateDelete({ id });
      }
    }
  }

  const isBusy = creating || updating || deleting || isFetching;
  const allDisabled = isBusy || isDelete; // delete modunda hər şey disable

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-green-500 mb-4">
        {isEdit ? "Edit" : isDelete ? "Delete" : "Create"} Venue
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
                      placeholder="Venue title"
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
                  <FormLabel>Venue Type (optional)</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="e.g. Stadium, Hall"
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
              name="openAT"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opens (optional)</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="time"
                      placeholder="openAT"
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
              name="closeAT"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Closes (optional)</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      type="time"
                      placeholder="closeAT"
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

            {/* Events: comma-separated ids */}
            <FormField
              control={form.control}
              name="events"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Events (comma separated IDs)</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border"
                      placeholder="e.g. 1,2,3"
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
            condition={!!editItem?.imageURL && !!form.watch("imageURL")}
          >
            <div className="mt-4">
              <h4>Existing Image</h4>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                <RenderIf condition={!!editItem}>
                  <img
                    src={editItem?.imageURL}
                    alt="Venue Image"
                    className="w-full object-cover rounded-lg"
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

            {/* Digər hallarda: Back + Submit */}
            <RenderIf condition={!isDelete}>
              <Button asChild variant="secondary" disabled={isBusy}>
                <Link
                  href={paths.DASHBOARD.VENUES.LIST}
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
      <div className="py-4">
        <CommentsSection
          initialComments={editItem?.Comment}
          isError={isError}
          isLoading={isFetching}
          hookOptions={{
            resourceId: id,
            parentField: "venueId",
            createFn: createVenueComment,
            deleteFn: deleteVenueComment,
            invalidateKey: [QUERY_KEYS.VENUE_BY_ID, id],
          }}
          title="Comments"
        />
      </div>
    </div>
  );
};

export default ActionForm;
