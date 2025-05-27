import {EntryFieldTypes, Asset} from "contentful";

export type ArtSkeleton = {
    contentTypeId: "art";
    fields: ArtSkeletonFields;
}

export type ArtSkeletonFields = {
    title: EntryFieldTypes.Text | string;
    date: EntryFieldTypes.Date | string;
    media: EntryFieldTypes.Text | string;
    lowRez: Asset;
    hiRez: Asset;
}