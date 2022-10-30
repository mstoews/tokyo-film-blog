export type Query = {
    statusType: StatusType[];
  };
  
  export interface Tag
{
    id?: string;
    title?: string;
}


  export interface StatusType {
    status: string;
    description: string;
    updatedte: string;
    updateusr: string;
  }



 