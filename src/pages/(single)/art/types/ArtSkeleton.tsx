import {Asset, EntryFieldTypes, EntrySkeletonType} from "contentful";

export interface ArtSkeletonFields {
    title: EntryFieldTypes.Text | string;
    date: EntryFieldTypes.Date | string;
    media: EntryFieldTypes.Text | string;
    lowRez: Asset;
    hiRez: Asset;
}

export interface ArtSkeleton extends EntrySkeletonType {
    contentTypeId: "art"; // Match the exact ID of the content type in Contentful
    fields: {
        title: EntryFieldTypes.Text | string;
        date: EntryFieldTypes.Date | string;
        media: EntryFieldTypes.Text | string;
        lowRez: Asset;
        hiRez: Asset;
    };
}

export interface ArtEntry extends EntrySkeletonType<ArtSkeleton> {
    contentTypeId: 'art';
}