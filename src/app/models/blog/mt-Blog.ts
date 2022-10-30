export interface BlogImages {
  image: string;
  thumbImage: string;
  alt: string;
  title: string;
}

export interface Blog {
  id:               number;
  title:            string;
  paragraph:        string;
  summary:          string;
  body:             string;
  conclusion:       string;
  detail:           string;
  user_updated:     string;
  date_created:     string;
  date_updated:     string;
  images:           BlogImages[];
}



