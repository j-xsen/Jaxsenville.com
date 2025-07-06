// Type-safe interfaces for Contentful API responses
export interface ContentfulAsset {
  fields: {
    file: {
      url: string;
    };
  };
}

export interface ContentfulBandcampAlbum {
  sys: {
    id: string;
  };
  fields: {
    id: number;
    url: string;
  };
}

export interface ContentfulBandcampEmbed {
  fields: {
    trackId: number;
    name: string;
    album?: {
      sys: {
        id: string;
      };
    };
  };
}

export interface ContentfulTrack {
  fields: {
    pos: number;
    name: string;
    embed?: ContentfulBandcampEmbed;
    lyrics?: string | undefined;
  };
}

export interface ContentfulRelease {
  fields: {
    name: string;
    date: string;
    cover: ContentfulAsset;
    spotify: string;
    tracks?: ContentfulTrack[];
  };
}

export interface ContentfulArt {
  fields: {
    title: string;
    date: string;
    media?: string;
    lowRez: ContentfulAsset;
    hiRez: ContentfulAsset;
    ratio: number;
  };
}

export interface ContentfulBlahg {
  fields: {
    url: string;
    createdAt: string;
    title: string;
    content?: string;
  };
}

export interface ContentfulResponse<T> {
  items: T[];
} 