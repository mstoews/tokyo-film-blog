export interface BlogImages {
  image: string;
  thumbImage: string;
  alt: string;
  title: string;

}

export interface Blog {
  id:               string;
  title:            string;
  paragraph:        string;
  body:             string;
  conclusion:       string;
  user_updated:     string;
  date_created:     string;
  date_updated:     string;
  published: boolean;
}

export interface BlogPartial {
  id: string;
  title:   string;
  date_created: string;
  published: boolean;
}




