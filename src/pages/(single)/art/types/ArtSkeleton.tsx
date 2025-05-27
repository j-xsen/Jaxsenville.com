import {EntryFieldTypes, Asset, EntrySkeletonType} from "contentful";

export interface ArtSkeletonFields {
    title: EntryFieldTypes.Text | string;
    date: EntryFieldTypes.Date | string;
    media: EntryFieldTypes.Text | string;
    lowRez: Asset;
    hiRez: Asset;
}

export interface ArtSkeleton {
    fields: ArtSkeletonFields
}

export interface ArtEntry extends EntrySkeletonType<ArtSkeleton> {
    contentTypeId: 'art';
}