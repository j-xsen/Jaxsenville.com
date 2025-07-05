// custom-typedefs.d.ts
import "contentful";

declare module "contentful" {
    interface OrderFilterPaths {
        "fields.date"?: string; // Allow fields.date in the order property
        "-fields.date"?: string;
    }
}