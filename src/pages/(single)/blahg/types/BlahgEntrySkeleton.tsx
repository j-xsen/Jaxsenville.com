import * as contentful from "contentful";

export type BlahgEntrySkeleton = {
    contentTypeId: "blahg";
    fields: {
        url: contentful.EntryFieldTypes.Symbol;
        createdAt: contentful.EntryFieldTypes.Date;
        title: contentful.EntryFieldTypes.Text;
        content: contentful.EntryFieldTypes.Text;
    };
};
