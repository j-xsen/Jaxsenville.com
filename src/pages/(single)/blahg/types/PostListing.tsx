import {ContentfulAsset} from "../../../../types/contentful-response.ts";

export default interface PostListing {
    ID: string;
    title: string;
    created_at: Date;
    url: string;
    heroImage?: ContentfulAsset;
}
